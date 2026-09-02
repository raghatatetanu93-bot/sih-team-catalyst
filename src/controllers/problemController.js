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
    const problems = await Problem.find().sort({ createdAt: -1 });
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProblemStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { governmentStatus } = req.body;

    const updatedProblem = await Problem.findByIdAndUpdate(
      id,
      { governmentStatus },
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

module.exports = { createProblem, getProblems, updateProblemStatus, getProblemStats };