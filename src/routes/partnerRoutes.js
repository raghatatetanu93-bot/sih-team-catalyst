const express = require('express');
const IndustryPartner = require('../models/IndustryPartner');
const router = express.Router();

// Register an industry partner / CSR sponsor
router.post('/', async (req, res) => {
  try {
    const partner = new IndustryPartner(req.body);
    await partner.save();
    res.status(201).json(partner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all industry partners
router.get('/', async (req, res) => {
  try {
    const partners = await IndustryPartner.find();
    res.status(200).json(partners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;