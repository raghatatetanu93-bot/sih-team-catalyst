const mongoose = require('mongoose');

const industryPartnerSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  sector: { type: String, required: true },
  csrFocusAreas: [{ type: String }],
  contactEmail: { type: String, required: true },
  committedFunding: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('IndustryPartner', industryPartnerSchema);