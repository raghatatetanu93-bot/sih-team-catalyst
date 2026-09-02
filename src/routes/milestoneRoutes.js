const express = require('express');
const Milestone = require('../models/Milestone');
const router = express.Router();

// Add a milestone to a project
router.post('/', async (req, res) => {
  try {
    const milestone = new Milestone(req.body);
    await milestone.save();
    res.status(201).json(milestone);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all milestones for a specific project
router.get('/project/:projectId', async (req, res) => {
  try {
    const milestones = await Milestone.find({ projectId: req.params.projectId });
    res.status(200).json(milestones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update milestone status
router.patch('/:id', async (req, res) => {
  try {
    const updated = await Milestone.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;