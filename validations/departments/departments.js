const Joi = require('joi');

const getAllDepartments = Joi.object({
  query: Joi.object({
    hod: Joi.number().optional(),
    start: Joi.date().optional(),
    end: Joi.date().optional(),
  }),
  params: Joi.object({}),
  body: Joi.object({}),
});

const getSingleDepartment = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({}),
});

const createDepartment = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    name: Joi.string().required(),
    headOfDepartmentId: Joi.number().optional(),
  }),
});

const updateDepartment = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({
    name: Joi.string().optional(),
    headOfDepartmentId: Joi.number().optional(),
  }),
});

const deleteDepartment = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({}),
});

module.exports = {
  getAllDepartments,
  getSingleDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
