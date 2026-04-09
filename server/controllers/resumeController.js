const fs = require('fs');
const mammoth = require('mammoth');
const { GoogleGenAI } = require('@google/genai');
const jwt = require('jsonwebtoken');
const Resume = require('../models/Resume');
const User = require('../models/User');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// @desc    Create a new resume
// @route   POST /api/resumes
// @access  Private
const createResume = async (req, res) => {
    try {
        const resumeData = {
            userId: req.user._id,
            title: req.body.title || 'Untitled Resume',
            ...req.body,
        };
        // Ensure userId is always the authenticated user
        resumeData.userId = req.user._id;

        const resume = await Resume.create(resumeData);
        res.status(201).json(resume);
    } catch (error) {
        console.error('Create resume error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all resumes for current user
// @route   GET /api/resumes
// @access  Private
const getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
        res.json(resumes);
    } catch (error) {
        console.error('Get resumes error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get a single resume by ID
// @route   GET /api/resumes/:id
// @access  Public (public resumes) / Private (private resumes need owner token)
const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Public resumes are accessible to everyone
        if (resume.public) {
            return res.json(resume);
        }

        // Private resumes require the owner's token
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(403).json({ message: 'Not authorized to view this resume' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (user && resume.userId.toString() === user._id.toString()) {
            return res.json(resume);
        }

        return res.status(403).json({ message: 'Not authorized to view this resume' });
    } catch (error) {
        console.error('Get resume error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update a resume
// @route   PUT /api/resumes/:id
// @access  Private
const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Check ownership
        if (resume.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this resume' });
        }

        const updatedResume = await Resume.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(updatedResume);
    } catch (error) {
        console.error('Update resume error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete a resume
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Check ownership
        if (resume.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this resume' });
        }

        await Resume.findByIdAndDelete(req.params.id);
        res.json({ message: 'Resume deleted successfully' });
    } catch (error) {
        console.error('Delete resume error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Upload and extract resume data via AI
// @route   POST /api/resumes/upload
// @access  Private
const uploadAndExtractResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filePath = req.file.path;
        const mimeType = req.file.mimetype;
        const resumeTitle = req.body.title || req.file.originalname.split('.')[0];

        // 1. Read file and convert to base64
        // 1. Read file
        const fileBuffer = fs.readFileSync(filePath);

        // 3. Setup Prompt & Contents based on File Type
        const prompt = `You are a high-precision Resume Parser. 
Extract all information from this resume file and return it in the following JSON format ONLY. 
If a field is missing, use an empty string "" or empty array [].

JSON Schema:
{
  "personal_info": {
    "full_name": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": "",
    "profession": ""
  },
  "professional_summary": "",
  "skills": ["skill1", "skill2"],
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ],
  "project": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ]
}

Strictly return ONLY valid JSON. No conversational text, no markdown code blocks.`;

        let contents = [];
        let extractedWordText = '';

        if (
            mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
            mimeType === 'application/msword' ||
            req.file.originalname.toLowerCase().endsWith('.docx')
        ) {
            // Use Mammoth to extract raw text from Word Document
            try {
                const result = await mammoth.extractRawText({ path: filePath });
                extractedWordText = result.value;
            } catch (err) {
                console.error('Mammoth extraction failed:', err);
                throw new Error('Failed to parse Word Document.');
            }

            contents = [
                prompt,
                { text: `Here is the resume content extracted from the Word Document:\n\n${extractedWordText}` }
            ];
        } else {
            // PDF or image - send as base64 inlineData (Natively supported by Gemini)
            const base64Data = fileBuffer.toString('base64');
            contents = [
                prompt,
                {
                    inlineData: {
                        data: base64Data,
                        mimeType: mimeType
                    }
                }
            ];
        }

        // 3. Call Gemini
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents
        });

        let text = response.text ? response.text.trim() : '';
        
        // Cleanup JSON markdown if present
        if (text.startsWith('```')) {
            text = text.replace(/```json?\n?/g, '').replace(/```$/g, '').trim();
        }

        // 4. Parse JSON
        let extractedData;
        try {
            extractedData = JSON.parse(text);
        } catch (parseError) {
            console.error('Gemini JSON Parse Error:', text);
            return res.status(500).json({ message: 'Failed to parse AI extraction results. Please try a different file.' });
        }

        // 5. Create Resume in DB
        const resume = await Resume.create({
            userId: req.user._id,
            title: resumeTitle,
            ...extractedData
        });

        // 6. Cleanup local file
        fs.unlinkSync(filePath);

        res.status(201).json(resume);
    } catch (error) {
        console.error('Upload and extract error:', error.message);
        // Cleanup file on error
        if (req.file && req.file.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: 'Failed to extract resume data. Please try again or fill manually.' });
    }
};

module.exports = { createResume, getResumes, getResumeById, updateResume, deleteResume, uploadAndExtractResume };
