const express = require('express');

const router = express.Router();

// routes
router.use('/users', require('./users'));
router.use('/departments', require('./departments'));
router.use('/documents', require('./documents'));
router.use('/notifications', require('./notifications'));

module.exports = router;
