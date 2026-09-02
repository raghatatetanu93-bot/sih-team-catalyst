const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  problemId: { type: String },
  title: { type: String },
  description: { type: String, required: true }, // Only this is required
  language: { type: String, default: 'en' },
  category: { type: String },
  location: {
    address: { type: String, required: true }, // And this is required
    district: { type: String },
    lat: { type: Number },
    lng: { type: Number }
  },
  evidenceUrl: { type: String },
  severity: { type: String, default: 'Medium' },
  urgency: { type: String, default: 'Medium' },
  affectedPopulation: { type: Number, default: 0 },
  priorityScore: { type: Number, default: 0 },
  emergencyStatus: { type: Boolean, default: false },
  summary: { type: String },
  suggestedSolutionArea: { type: String },
  relatedReports: [{ type: String }],
  systemicCluster: { type: String },
  governmentStatus: { type: String, default: 'Reported' },
  createdAt: { type: Date, default: Date.now },
  assignedUniversity: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'University',
  default: null
}
});

module.exports = mongoose.model('Problem', problemSchema);