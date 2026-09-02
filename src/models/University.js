const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  district: { type: String, required: true },
  expertise: [{ type: String }], // e.g., ["Water & Sanitation", "Agriculture", "Public Works"]
  contactEmail: { type: String, required: true },
  activeProjectsCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('University', universitySchema);