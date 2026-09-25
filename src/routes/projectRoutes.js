const express = require('express');
const mongoose = require('mongoose');
const Project = require('../models/Project');
const Problem = require('../models/Problem');
const University = require('../models/University');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Submit a solution proposal - only universities can create/submit projects
router.post('/', protect, authorize('university'), async (req, res) => {
  try {
    let { problemId, universityId, title, proposalDescription, facultyMentor, studentTeam, status } = req.body;

    if (!problemId) {
      return res.status(400).json({ error: 'problemId is required' });
    }

    // Resolve universityId if missing or invalid
    if (!universityId || !mongoose.Types.ObjectId.isValid(universityId)) {
      if (mongoose.Types.ObjectId.isValid(problemId)) {
        const problem = await Problem.findById(problemId);
        if (problem && problem.assignedUniversity) {
          universityId = problem.assignedUniversity;
        }
      }
    }

    if (!universityId || !mongoose.Types.ObjectId.isValid(universityId)) {
      const defaultUni = await University.findOne();
      if (defaultUni) {
        universityId = defaultUni._id;
      }
    }

    if (!universityId) {
      return res.status(400).json({ error: 'No university available to associate with proposal' });
    }

    const teamArray = Array.isArray(studentTeam)
      ? studentTeam
      : (studentTeam ? String(studentTeam).split(',').map(s => s.trim()).filter(Boolean) : ['University Research Team']);

    const project = new Project({
      problemId,
      universityId,
      title: title || 'Innovation Solution Proposal',
      proposalDescription: proposalDescription || req.body.description || 'University proposal submitted for societal challenge.',
      facultyMentor: facultyMentor || 'Faculty Lead',
      studentTeam: teamArray,
      status: status || 'Submitted'
    });

    await project.save();

    // Populate problem and university for clean client response
    const populated = await Project.findById(project._id).populate('problemId universityId');
    console.log(`[Project Created] ID: ${project._id}, Title: "${project.title}", University: "${populated?.universityId?.name}", Problem: "${populated?.problemId?.title || populated?.problemId?.category}"`);

    res.status(201).json(populated || project);
  } catch (err) {
    console.error('Error creating project:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// Get all university solution projects - protected read endpoint
router.get('/', protect, async (req, res) => {
  try {
    const projects = await Project.find().populate('problemId universityId').sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single project by ID with populated relations
router.get('/:id', protect, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid project ID format' });
    }
    const project = await Project.findById(req.params.id).populate('problemId universityId');
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;