const Resume = require('../models/Resume');

// @desc    Create a new resume
// @route   POST /api/resumes
// @access  Private
const createResume = async (req, res) => {
    try {
        const resume = await Resume.create({
            userId: req.user._id,
            title: req.body.title || 'Untitled Resume',
        });

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
// @access  Private / Public (if resume is public)
const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Allow access if the resume is public OR if the user owns it
        if (resume.public || (req.user && resume.userId.toString() === req.user._id.toString())) {
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

module.exports = { createResume, getResumes, getResumeById, updateResume, deleteResume };
