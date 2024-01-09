const Joi = require('joi');

const getAllExpiryDocuments = Joi.object({
  query: Joi.object({
    department: Joi.string().optional(),
    start: Joi.string().optional(),
    end: Joi.string().optional(),
    startExpiry: Joi.string().optional(),
    endExpiry: Joi.string().optional(),
    status: Joi.string().optional(),
  }),
  params: Joi.object({}),
  body: Joi.object({}),
});

module.exports = {
  getAllExpiryDocuments,
};
