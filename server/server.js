const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ─── Middleware ───────────────────────────────────────────
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://resume-builder-xi-amber-90.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// ─── Routes ──────────────────────────────────────────────
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/resumes', require('./routes/resumeRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/analyze', require('./routes/analyzeRoutes'));

// Health check
app.get('/', (req, res) => {
    res.json({ message: '🚀 Resume Builder API is running' });
});

// ─── Start Server ────────────────────────────────────────
const PORT = process.env.PORT || 5000;

// Only listen if not running as a Vercel serverless function
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`\n🚀 Server running on http://localhost:${PORT}`);
        console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}\n`);
    });
}

module.exports = app;
