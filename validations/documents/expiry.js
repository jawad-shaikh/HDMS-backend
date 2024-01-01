const Joi = require('joi');

const getAllExpiryDocuments = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({}),
});

module.exports = {
  getAllExpiryDocuments,
};
