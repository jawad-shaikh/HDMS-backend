const Joi = require('joi');

const getAllExpiryDocuments = Joi.object({
  query: Joi.object({
    department: Joi.boolean().optional(),
  }),
  params: Joi.object({}),
  body: Joi.object({}),
});

module.exports = {
  getAllExpiryDocuments,
};
