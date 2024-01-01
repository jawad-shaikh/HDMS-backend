const express = require('express');

const validateRequest = require('../../middlewares/validateRequest.middleware');

const usersValidations = require('../../validations/users/users');
const usersControllers = require('../../controllers/users/users.controllers');

const router = express.Router();

router.get('/', validateRequest(usersValidations.getAllUsers), usersControllers.getAllUsers);
router.get('/:id', validateRequest(usersValidations.getSingleUsers), usersControllers.getSingleUsers);
router.post('/', validateRequest(usersValidations.createUsers), usersControllers.createUsers);
router.patch('/:id', validateRequest(usersValidations.updateUsers), usersControllers.updateUsers);
router.delete('/:id', validateRequest(usersValidations.deleteUsers), usersControllers.deleteUsers);

module.exports = router;
