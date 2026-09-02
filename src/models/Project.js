const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
  title: { type: String, required: true },
  proposalDescription: { type: String, required: true },
  facultyMentor: { type: String, required: true },
  studentTeam: [{ type: String }],
  status: { type: String, enum: ['Submitted', 'Under Review', 'Approved', 'Funded'], default: 'Submitted' }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);