const express = require('express');

const router = express.Router();

// routes
router.use('/requests', require('./requests'));
router.use('/submissions', require('./submissions'));
router.use('/history', require('./history'));
router.use('/expired', require('./expired'));

module.exports = router;
