const Problem = require('../models/Problem');
const University = require('../models/University');
const IndustryPartner = require('../models/IndustryPartner');
const Project = require('../models/Project');

const getEcosystemAnalytics = async (req, res) => {
  try {
    const totalProblems = await Problem.countDocuments();
    const totalUniversities = await University.countDocuments();
    const totalPartners = await IndustryPartner.countDocuments();
    const totalProjects = await Project.countDocuments();

    // Aggregate funding
    const partners = await IndustryPartner.find();
    const totalFundingCommitted = partners.reduce((acc, curr) => acc + (curr.committedFunding || 0), 0);

    // Thematic distribution of problems
    const categoryBreakdown = await Problem.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      summary: {
        totalProblems,
        totalUniversities,
        totalPartners,
        totalProjects,
        totalFundingCommitted
      },
      categoryBreakdown
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getEcosystemAnalytics };