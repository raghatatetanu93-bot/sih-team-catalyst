const express = require('express');
const { createProblem, getProblems, getProblemById, updateProblem, getProblemStats } = require('../controllers/problemController');
const router = express.Router();

router.post('/', createProblem);
router.get('/', getProblems);
router.get('/stats', getProblemStats);
router.get('/:id', getProblemById);
router.patch('/:id', updateProblem);
module.exports = router;