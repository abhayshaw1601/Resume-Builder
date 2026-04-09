const { GoogleGenAI } = require('@google/genai');
const Resume = require('../models/Resume');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// @desc    Analyze a resume with Gemini 2.5 Flash
// @route   POST /api/analyze/:resumeId
// @access  Private
const analyzeResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.resumeId);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Check ownership
        if (resume.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to analyze this resume' });
        }

        // Build resume text for analysis
        const resumeText = buildResumeText(resume);

        const prompt = `You are an expert ATS (Applicant Tracking System) resume analyst. Analyze the following resume and provide a detailed assessment.

RESUME:
${resumeText}

Provide your analysis in the following JSON format ONLY (no markdown, no code blocks, just raw JSON):
{
  "ats_score": <number 0-100>,
  "overall_rating": "<Excellent|Good|Average|Needs Improvement|Poor>",
  "strengths": [
    "<strength 1>",
    "<strength 2>",
    "<strength 3>"
  ],
  "weaknesses": [
    "<weakness 1>",
    "<weakness 2>",
    "<weakness 3>"
  ],
  "suggestions": [
    "<actionable suggestion 1>",
    "<actionable suggestion 2>",
    "<actionable suggestion 3>",
    "<actionable suggestion 4>"
  ],
  "keyword_analysis": {
    "present_keywords": ["<keyword1>", "<keyword2>"],
    "missing_keywords": ["<keyword1>", "<keyword2>"],
    "recommendation": "<brief keyword recommendation>"
  },
  "section_scores": {
    "personal_info": <number 0-100>,
    "summary": <number 0-100>,
    "experience": <number 0-100>,
    "education": <number 0-100>,
    "skills": <number 0-100>,
    "projects": <number 0-100>
  },
  "summary": "<2-3 sentence overall summary of the resume quality>"
}

Rules:
- Be specific and actionable in suggestions
- Score based on ATS compatibility, content quality, formatting, and completeness
- If a section is empty, give it a low score and mention it in weaknesses
- Consider industry standards for the profession mentioned
- Return ONLY valid JSON, no additional text`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-lite',
            contents: prompt,
        });

        // Parse the response
        let analysisText = response.text.trim();
        
        // Extract JSON specifically if it's wrapped in a code block or has trailing text
        const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            analysisText = jsonMatch[0];
        }

        const analysis = JSON.parse(analysisText);

        res.json({
            success: true,
            resumeId: resume._id,
            resumeTitle: resume.title,
            analysis,
        });
    } catch (error) {
        console.error('Analyze resume error:', error.message);

        if (error.message.includes('JSON')) {
            return res.status(500).json({ message: 'AI returned an invalid response. Please try again.' });
        }

        res.status(500).json({ message: 'Failed to analyze resume. Please try again.' });
    }
};

// Helper: Build readable resume text from DB document
function buildResumeText(resume) {
    const lines = [];

    // Personal Info
    if (resume.personal_info) {
        const pi = resume.personal_info;
        lines.push('=== PERSONAL INFORMATION ===');
        if (pi.full_name) lines.push(`Name: ${pi.full_name}`);
        if (pi.profession) lines.push(`Profession: ${pi.profession}`);
        if (pi.email) lines.push(`Email: ${pi.email}`);
        if (pi.phone) lines.push(`Phone: ${pi.phone}`);
        if (pi.location) lines.push(`Location: ${pi.location}`);
        if (pi.linkedin) lines.push(`LinkedIn: ${pi.linkedin}`);
        if (pi.website) lines.push(`Website: ${pi.website}`);
        lines.push('');
    }

    // Professional Summary
    if (resume.professional_summary) {
        lines.push('=== PROFESSIONAL SUMMARY ===');
        lines.push(resume.professional_summary);
        lines.push('');
    }

    // Experience
    if (resume.experience && resume.experience.length > 0) {
        lines.push('=== EXPERIENCE ===');
        resume.experience.forEach(exp => {
            lines.push(`${exp.position} at ${exp.company}`);
            lines.push(`${exp.start_date} - ${exp.is_current ? 'Present' : exp.end_date}`);
            if (exp.description) lines.push(exp.description);
            lines.push('');
        });
    }

    // Education
    if (resume.education && resume.education.length > 0) {
        lines.push('=== EDUCATION ===');
        resume.education.forEach(edu => {
            lines.push(`${edu.degree}${edu.field ? ' in ' + edu.field : ''} — ${edu.institution}`);
            if (edu.graduation_date) lines.push(`Graduation: ${edu.graduation_date}`);
            if (edu.gpa) lines.push(`GPA: ${edu.gpa}`);
            lines.push('');
        });
    }

    // Skills
    if (resume.skills && resume.skills.length > 0) {
        lines.push('=== SKILLS ===');
        lines.push(resume.skills.join(', '));
        lines.push('');
    }

    // Projects
    if (resume.project && resume.project.length > 0) {
        lines.push('=== PROJECTS ===');
        resume.project.forEach(proj => {
            lines.push(`${proj.name}${proj.type ? ' (' + proj.type + ')' : ''}`);
            if (proj.description) lines.push(proj.description);
            lines.push('');
        });
    }

    return lines.join('\n');
}

module.exports = { analyzeResume };
