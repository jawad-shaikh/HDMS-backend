const express = require('express');

const router = express.Router();

// routes
router.use('/users', require('./users'));
router.use('/departments', require('./departments'));
router.use('/documents', require('./documents'));

module.exports = router;
