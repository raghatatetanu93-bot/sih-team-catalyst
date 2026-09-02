const University = require('../models/University');

async function assignUniversityToProblem(problem) {
  if (!problem.category || !problem.location || !problem.location.district) return;

  try {
    let matchedUniversity = await University.findOne({
      district: problem.location.district,
      expertise: problem.category
    });

    if (!matchedUniversity) {
      matchedUniversity = await University.findOne({
        expertise: problem.category
      });
    }

    if (matchedUniversity) {
      problem.assignedUniversity = matchedUniversity._id;
      await problem.save();
      
      matchedUniversity.activeProjectsCount += 1;
      await matchedUniversity.save();
    }
  } catch (error) {
    console.error('University matching failed:', error.message);
  }
}

module.exports = { assignUniversityToProblem };