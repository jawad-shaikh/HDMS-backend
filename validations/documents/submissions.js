const Joi = require('joi');

const getAllDocumentSubmissions = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({}),
});

const getSingleDocumentSubmission = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({}),
});

const createDocumentSubmission = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    documentRequestId: Joi.number().required(),
    purpose: Joi.string().required(),
    description: Joi.string().required(),
  }),
});

const updateDocumentSubmission = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({
    purpose: Joi.string().required(),
    description: Joi.string().required(),
  }),
});

const deleteDocumentSubmission = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({}),
});

module.exports = {
  getAllDocumentSubmissions,
  getSingleDocumentSubmission,
  createDocumentSubmission,
  updateDocumentSubmission,
  deleteDocumentSubmission,
};
