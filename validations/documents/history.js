const Joi = require('joi');

const getAllDocumentHistory = Joi.object({
  query: Joi.object({
    start: Joi.string().optional(),
    end: Joi.string().optional(),
    startExpiry: Joi.string().optional(),
    endExpiry: Joi.string().optional(),
    hrId: Joi.number().optional(),
    status: Joi.string().optional(),
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
