const express = require('express');

const router = express.Router();

// routes
router.use('/', require('./departments'));

module.exports = router;
