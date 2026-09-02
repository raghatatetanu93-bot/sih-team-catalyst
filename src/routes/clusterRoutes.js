const express = require('express');
const Cluster = require('../models/Cluster');
const router = express.Router();

// Get all clusters
router.get('/', async (req, res) => {
  try {
    const clusters = await Cluster.find().populate('problemIds');
    res.status(200).json(clusters);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;