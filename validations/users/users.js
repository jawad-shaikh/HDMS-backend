const Joi = require('joi');

const getAllUsers = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({}),
});

const getSingleUsers = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({}),
});

const updateUsers = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    departmentId: Joi.number().optional(),
    employeeNumber: Joi.string().optional(),
    idNumber: Joi.string().optional(),
    role: Joi.string().valid('ADMIN', 'HR', 'HOD', 'STAFF').optional(),
  }),
});

const deleteUsers = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({}),
});

module.exports = {
  getAllUsers,
  getSingleUsers,
  updateUsers,
  deleteUsers,
};
