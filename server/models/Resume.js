const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: [true, 'Resume title is required'],
        trim: true,
    },
    personal_info: {
        full_name: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        location: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        website: { type: String, default: '' },
        github: { type: String, default: '' },
        profession: { type: String, default: '' },
        image: { type: String, default: '' },
    },
    professional_summary: {
        type: String,
        default: '',
    },
    skills: [{
        type: String,
    }],
    experience: [{
        company: { type: String, default: '' },
        position: { type: String, default: '' },
        start_date: { type: String, default: '' },
        end_date: { type: String, default: '' },
        description: { type: String, default: '' },
        is_current: { type: Boolean, default: false },
    }],
    education: [{
        institution: { type: String, default: '' },
        degree: { type: String, default: '' },
        field: { type: String, default: '' },
        graduation_date: { type: String, default: '' },
        gpa: { type: String, default: '' },
    }],
    project: [{
        name: { type: String, default: '' },
        type: { type: String, default: '' },
        description: { type: String, default: '' },
    }],
    template: {
        type: String,
        default: 'classic',
    },
    accent_color: {
        type: String,
        default: '#A6FF5D',
    },
    font_size: {
        type: Number,
        default: 16,
    },
    section_spacing: {
        type: Number,
        default: 24,
    },
    public: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Resume', resumeSchema);
