const mongoose = require('mongoose');
const Problem = require('../models/Problem');
const University = require('../models/University');
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
    const photoUrl = req.body.evidenceUrl || req.body.photo || (req.body.evidence && (req.body.evidence.base64 || req.body.evidence)) || '';
    const district = (req.body.location && req.body.location.district) ? req.body.location.district.trim() : (req.body.district || aiData.district || 'Ranchi');

    const newProblem = new Problem({
      description: req.body.description,
      location: {
        address: req.body.location?.address || 'Incident Location',
        district: district,
        lat: req.body.location?.lat ?? null,
        lng: req.body.location?.lng ?? null,
      },
      evidenceUrl: photoUrl,
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
    console.log(`[Problem Created] ID: ${newProblem._id}, District: "${newProblem.location?.district}", Photo attached: ${Boolean(newProblem.evidenceUrl)}`);

    await groupProblemIntoCluster(newProblem);
    await assignUniversityToProblem(newProblem);

    res.status(201).json(newProblem);
  } catch (error) {
    console.error('Error creating problem:', error.message);
    res.status(400).json({ message: error.message });
  }
};

const getProblems = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.governmentStatus = req.query.status;
    if (req.query.emergency !== undefined) {
      filter.emergencyStatus = req.query.emergency === 'true';
    }
    const problems = await Problem.find(filter).populate('assignedUniversity').sort({ createdAt: -1 });
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProblemById = async (req, res) => {
  try {
    const { id } = req.params;
    let problem = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      problem = await Problem.findById(id).populate('assignedUniversity');
    }

    if (!problem) {
      problem = await Problem.findOne({ problemId: id }).populate('assignedUniversity');
    }

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    res.status(200).json(problem);
  } catch (error) {
    console.error('Error in getProblemById:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateProblem = async (req, res) => {
  try {
    const { id } = req.params;
    // Whitelist allowed fields to be updated
    const updateFields = {};
    if (req.body.governmentStatus !== undefined) updateFields.governmentStatus = req.body.governmentStatus;
    if (req.body.emergencyStatus !== undefined) updateFields.emergencyStatus = req.body.emergencyStatus;
    if (req.body.severity !== undefined) updateFields.severity = req.body.severity;
    if (req.body.urgency !== undefined) updateFields.urgency = req.body.urgency;
    if (req.body.affectedPopulation !== undefined) updateFields.affectedPopulation = Number(req.body.affectedPopulation);
    if (req.body.priorityScore !== undefined) updateFields.priorityScore = Number(req.body.priorityScore);
    if (req.body.title !== undefined) updateFields.title = req.body.title;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: 'No valid fields provided for update' });
    }

    let updatedProblem = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      updatedProblem = await Problem.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true }
      );
    }

    if (!updatedProblem) {
      updatedProblem = await Problem.findOneAndUpdate(
        { problemId: id },
        { $set: updateFields },
        { new: true }
      );
    }

    if (!updatedProblem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    res.status(200).json(updatedProblem);
  } catch (error) {
    console.error('Error in updateProblem:', error.message);
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