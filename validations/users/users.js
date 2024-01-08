const Joi = require('joi');

const getAllUsers = Joi.object({
  query: Joi.object({
    role: Joi.string().valid('ADMIN', 'HR', 'HOD', 'STAFF').optional(),
    department: Joi.number().optional(),
    start: Joi.date().optional(),
    end: Joi.date().optional(),
  }),
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

const createUsers = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    departmentId: Joi.number().optional(),
    role: Joi.string().valid('ADMIN', 'HR', 'HOD', 'STAFF').required(),
    employeeNumber: Joi.string().required(),
    idNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
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
    password: Joi.string().required(),
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
  createUsers,
  updateUsers,
  deleteUsers,
};
