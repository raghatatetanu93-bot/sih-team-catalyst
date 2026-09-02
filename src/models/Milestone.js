const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true }, // e.g., "Prototype Design", "Field Testing"
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  targetDate: { type: Date },
  completionNotes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Milestone', milestoneSchema);