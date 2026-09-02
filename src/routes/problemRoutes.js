const express = require('express');
const { createProblem, getProblems, updateProblemStatus, getProblemStats } = require('../controllers/problemController');
const router = express.Router();

router.post('/', createProblem);
router.get('/', getProblems);
router.patch('/:id/status', updateProblemStatus);
router.get('/stats', getProblemStats);
module.exports = router;