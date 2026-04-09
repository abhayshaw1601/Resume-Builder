const express = require('express');
const router = express.Router();
const {
    createResume,
    getResumes,
    getResumeById,
    updateResume,
    deleteResume,
    uploadAndExtractResume
} = require('../controllers/resumeController');
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// ─── Public Routes ───────────────────────────────────────
// GET /api/resumes/:id → Get a single resume (public resumes don't need auth)
router.get('/:id', getResumeById);

// ─── Protected Routes ────────────────────────────────────
router.use(protect);

// POST   /api/resumes/upload → Upload and extract resume data via AI
router.post('/upload', upload.single('resume'), uploadAndExtractResume);

// POST   /api/resumes       → Create a new resume
router.post('/', createResume);

// GET    /api/resumes        → Get all resumes of the logged-in user
router.get('/', getResumes);

// PUT    /api/resumes/:id    → Update a resume
router.put('/:id', updateResume);

// DELETE /api/resumes/:id    → Delete a resume
router.delete('/:id', deleteResume);

module.exports = router;
