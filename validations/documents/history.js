const Joi = require('joi');

const getAllDocumentHistory = Joi.object({
  query: Joi.object({}),
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
