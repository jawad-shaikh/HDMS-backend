const express = require('express');

const validateRequest = require('../../middlewares/validateRequest.middleware');

const departmentValidations = require('../../validations/departments/departments');
const departmentControllers = require('../../controllers/departments/departments.controllers');

const router = express.Router();

router.get('/', validateRequest(departmentValidations.getAllDepartments), departmentControllers.getAllDepartments);
router.get('/:id', validateRequest(departmentValidations.getSingleDepartment), departmentControllers.getSingleDepartment);
router.post('/', validateRequest(departmentValidations.createDepartment), departmentControllers.createDepartment);
router.patch('/:id', validateRequest(departmentValidations.updateDepartment), departmentControllers.updateDepartment);
router.delete('/:id', validateRequest(departmentValidations.deleteDepartment), departmentControllers.deleteDepartment);

module.exports = router;
