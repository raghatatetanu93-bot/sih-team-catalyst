const mongoose = require('mongoose');

const clusterSchema = new mongoose.Schema({
  title: String,
  category: String,
  district: String,
  problemIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
  totalAffectedPopulation: { type: Number, default: 0 },
  averagePriority: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cluster', clusterSchema);