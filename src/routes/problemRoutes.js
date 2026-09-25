const express = require('express');
const { createProblem, getProblems, getProblemById, updateProblem, getProblemStats } = require('../controllers/problemController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Only citizens can create problems
router.post('/', protect, authorize('citizen'), createProblem);

// Protected read routes
router.get('/', protect, getProblems);
router.get('/stats', protect, getProblemStats);
router.get('/:id', protect, getProblemById);

// Only government can PATCH validation status
router.patch('/:id', protect, authorize('government'), updateProblem);

module.exports = router;