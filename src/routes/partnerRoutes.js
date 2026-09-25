const express = require('express');
const IndustryPartner = require('../models/IndustryPartner');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Register an industry partner / CSR sponsor - only industry can post
router.post('/', protect, authorize('industry'), async (req, res) => {
  try {
    const companyName = req.body.companyName || req.body.organizationName || 'Industry Partner';
    const sector = req.body.sector || req.body.category || req.body.supportType || 'General CSR';
    const csrFocusAreas = Array.isArray(req.body.csrFocusAreas)
      ? req.body.csrFocusAreas
      : (req.body.csrFocusAreas ? [req.body.csrFocusAreas] : (req.body.category ? [req.body.category] : ['Sustainability']));
    const contactEmail = req.body.contactEmail || req.body.email || 'csr@industry.org';
    const committedFunding = Number(req.body.committedFunding || req.body.amount || 0) || 500000;

    const partner = new IndustryPartner({
      companyName,
      sector,
      csrFocusAreas,
      contactEmail,
      committedFunding
    });

    await partner.save();
    console.log(`[Partner Created] ID: ${partner._id}, Company: "${partner.companyName}", Funding: ₹${partner.committedFunding}`);
    res.status(201).json(partner);
  } catch (err) {
    console.error('Error creating partner:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// Get all industry partners - protected read endpoint
router.get('/', protect, async (req, res) => {
  try {
    const partners = await IndustryPartner.find().sort({ createdAt: -1 });
    res.status(200).json(partners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;