const express = require('express');
const mongoose = require('mongoose');
const Milestone = require('../models/Milestone');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Add a milestone to a project
router.post('/', protect, authorize('university', 'government'), async (req, res) => {
  try {
    const { projectId, title } = req.body;
    if (!projectId || !title) {
      return res.status(400).json({ error: 'projectId and title are required' });
    }
    const milestone = new Milestone(req.body);
    await milestone.save();
    res.status(201).json(milestone);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all milestones for a specific project
router.get('/project/:projectId', protect, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) {
      return res.status(200).json([]);
    }
    const milestones = await Milestone.find({ projectId: req.params.projectId }).sort({ createdAt: 1 });
    res.status(200).json(milestones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update milestone status
router.patch('/:id', protect, authorize('university', 'government'), async (req, res) => {
  try {
    const updated = await Milestone.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ error: 'Milestone not found' });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete milestone
router.delete('/:id', protect, authorize('university', 'government'), async (req, res) => {
  try {
    const deleted = await Milestone.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Milestone not found' });
    }
    res.status(200).json({ message: 'Milestone deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;