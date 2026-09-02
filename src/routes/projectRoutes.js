const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// Submit a solution proposal from a university
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all university solution projects
router.get('/', async (req, res) => {
  try {
    // Populates the referenced problem and university data
    const projects = await Project.find().populate('problemId universityId');
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;