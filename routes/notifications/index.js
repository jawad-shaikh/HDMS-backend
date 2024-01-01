const express = require('express');

const router = express.Router();

// routes
router.use('/', require('./notifications'));

module.exports = router;
