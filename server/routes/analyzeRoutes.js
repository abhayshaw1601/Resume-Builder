const express = require('express');
const router = express.Router();
const { analyzeResume } = require('../controllers/analyzeController');
const protect = require('../middleware/authMiddleware');

// All analyze routes are protected
router.use(protect);

// POST /api/analyze/:resumeId → Analyze a resume with Gemini AI
router.post('/:resumeId', analyzeResume);

module.exports = router;
