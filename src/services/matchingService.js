const University = require('../models/University');

async function assignUniversityToProblem(problem) {
  if (!problem.category || !problem.location || !problem.location.district) {
    if (process.env.DEBUG) console.log(`[matchingService] Early exit: district="${problem?.location?.district}", category="${problem?.category}"`);
    return;
  }

  if (process.env.DEBUG) console.log(`[matchingService] Matching university for problem ${problem._id}: District="${problem.location.district}", Category="${problem.category}"`);

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