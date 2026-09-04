const Problem = require('../models/Problem');
const { analyzeProblem } = require('../services/aiService');
const { groupProblemIntoCluster } = require('../services/clusteringService');
const { assignUniversityToProblem } = require('../services/matchingService');

const createProblem = async (req, res) => {
  let aiData;

  try {
    aiData = await analyzeProblem(req.body.description);
  } catch (error) {
    console.error('AI analysis failed. Using safe default values:', error.message);
    aiData = {}; // Safe fallback for AI-dependent fields
  }

  try {
    const newProblem = new Problem({
      description: req.body.description,
      location: req.body.location,
      category: aiData.category || 'Unassigned',
      severity: aiData.severity || 'Medium',
      urgency: aiData.urgency || 'Medium',
      affectedPopulation: aiData.affectedPopulation || 0,
      priorityScore: aiData.priorityScore || 50,
      emergencyStatus: aiData.emergencyStatus || false,
      summary: aiData.summary || '',
      suggestedSolutionArea: aiData.suggestedSolutionArea || '',
    });

    await newProblem.save();
    await groupProblemIntoCluster(newProblem);
    await assignUniversityToProblem(newProblem);

    res.status(201).json(newProblem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProblems = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.governmentStatus = req.query.status;
    const problems = await Problem.find(filter).sort({ createdAt: -1 });
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProblemById = async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await Problem.findById(id);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const { governmentStatus, emergencyStatus } = req.body;
    
    // Whitelist only allowed fields to be updated
    const updateFields = {};
    if (governmentStatus !== undefined) updateFields.governmentStatus = governmentStatus;
    if (emergencyStatus !== undefined) updateFields.emergencyStatus = emergencyStatus;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: 'No valid fields provided for update' });
    }

    const updatedProblem = await Problem.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedProblem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    res.status(200).json(updatedProblem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getProblemStats = async (req, res) => {
  try {
    const totalReports = await Problem.countDocuments();
    const activeEmergencies = await Problem.countDocuments({ emergencyStatus: true });
    const criticalIssues = await Problem.countDocuments({ severity: 'Critical' });
    const resolvedIssues = await Problem.countDocuments({ governmentStatus: 'Resolved' });

    res.status(200).json({
      totalReports,
      activeEmergencies,
      criticalIssues,
      resolvedIssues
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProblem, getProblems, getProblemById, updateProblem, getProblemStats };