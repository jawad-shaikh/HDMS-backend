const Joi = require('joi');

const getAllDocumentHistory = Joi.object({
  query: Joi.object({
    start: Joi.date().optional(),
    end: Joi.date().optional(),
    startExpiry: Joi.date().optional(),
    endExpiry: Joi.date().optional(),
    hr: Joi.number().optional(),
    status: Joi.string().valid('PENDING', 'APPROVED', 'REJECTED').optional(),
  }),
  params: Joi.object({}),
  body: Joi.object({}),
});

const getSingleDocumentHistory = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({}),
});

module.exports = {
  getAllDocumentHistory,
  getSingleDocumentHistory,
};
