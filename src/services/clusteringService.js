const Cluster = require('../models/Cluster');

async function groupProblemIntoCluster(problem) {
  if (!problem.location || !problem.location.district || !problem.category) {
    if (process.env.DEBUG) console.log(`[clusteringService] Early exit: district="${problem?.location?.district}", category="${problem?.category}"`);
    return;
  }

  if (process.env.DEBUG) console.log(`[clusteringService] Clustering problem ${problem._id}: District="${problem.location.district}", Category="${problem.category}"`);

  // 1. Look for an existing cluster in the same district and category
  let cluster = await Cluster.findOne({
    district: problem.location.district,
    category: problem.category
  });

  if (cluster) {
    // 2. If it exists, add this new problem to it
    cluster.problemIds.push(problem._id);
    cluster.totalAffectedPopulation += problem.affectedPopulation || 0;
    
    // Average out the priority score
    cluster.averagePriority = Math.round((cluster.averagePriority + problem.priorityScore) / 2);
    await cluster.save();
  } else {
    // 3. If it doesn't exist, create a brand new cluster
    cluster = new Cluster({
      title: `Systemic Issue: ${problem.category} in ${problem.location.district}`,
      category: problem.category,
      district: problem.location.district,
      problemIds: [problem._id],
      totalAffectedPopulation: problem.affectedPopulation || 0,
      averagePriority: problem.priorityScore || 0
    });
    await cluster.save();
  }

  // 4. Link the cluster ID back to the original problem
  problem.systemicCluster = cluster._id;
  await problem.save();
}

module.exports = { groupProblemIntoCluster };