const express = require('express');
const router = express.Router();
const controller = require('../controllers/healthController');

router.get('/dashboard', controller.renderDashboard);

module.exports = router;