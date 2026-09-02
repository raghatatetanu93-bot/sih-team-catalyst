const express = require('express');
const { getEcosystemAnalytics } = require('../controllers/analyticsController');
const router = express.Router();

// Route to fetch ecosystem dashboard stats
router.get('/dashboard', getEcosystemAnalytics);

module.exports = router;