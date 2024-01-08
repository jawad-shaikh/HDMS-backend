const Joi = require('joi');

const getAllExpiryDocuments = Joi.object({
  query: Joi.object({
    department: Joi.boolean().optional(),
    start: Joi.date().optional(),
    end: Joi.date().optional(),
    startExpiry: Joi.date().optional(),
    endExpiry: Joi.date().optional(),
    status: Joi.string().valid('PENDING', 'APPROVED', 'REJECTED').optional(),
  }),
  params: Joi.object({}),
  body: Joi.object({}),
});

module.exports = {
  getAllExpiryDocuments,
};
