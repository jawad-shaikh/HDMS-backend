const express = require('express');

const validateRequest = require('@/middlewares/validateRequest.middleware');

const authValidations = require('../../validations/users/auth');
const authControllers = require('../../controllers/users/auth.controllers');

const router = express.Router();

router.post('/login', validateRequest(authValidations.login), authControllers.login);
router.post('/register', validateRequest(authValidations.register), authControllers.register);

module.exports = router;
