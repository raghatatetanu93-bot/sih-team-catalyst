const express = require('express');
const { getEcosystemAnalytics } = require('../controllers/analyticsController');
const router = express.Router();

// Routes to fetch ecosystem dashboard & impact stats
router.get('/', getEcosystemAnalytics);
router.get('/dashboard', getEcosystemAnalytics);
router.get('/impact', getEcosystemAnalytics);

module.exports = router;