const express = require('express');
const router = express.Router();
const { submitContact } = require('../controllers/contactController');

// POST /api/contact  → Submit a contact form message
router.post('/', submitContact);

module.exports = router;
