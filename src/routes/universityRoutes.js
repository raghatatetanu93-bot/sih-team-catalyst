const express = require('express');
const University = require('../models/University');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const uni = new University(req.body);
    await uni.save();
    res.status(201).json(uni);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all universities
router.get('/', async (req, res) => {
  try {
    const universities = await University.find();
    res.status(200).json(universities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;