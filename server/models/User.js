const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: function() { return !this.googleId; }, // Only required if not a google user
        minlength: [6, 'Password must be at least 6 characters'],
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true, // Allows multiple null/undefined values
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
