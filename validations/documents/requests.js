const Joi = require('joi');

const getAllDocumentRequests = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({}),
});

const getSingleDocumentRequest = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({}),
});

const createDocumentRequest = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    documentType: Joi.string().valid('NORMAL', 'QUESTION').required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    isRepeated: Joi.boolean().required(),
  }),
});

const updateDocumentRequest = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({
    documentType: Joi.string().valid('NORMAL', 'QUESTION').optional(),
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    isRepeated: Joi.boolean().optional(),
  }),
});

const deleteDocumentRequest = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({}),
});

module.exports = {
  getAllDocumentRequests,
  getSingleDocumentRequest,
  createDocumentRequest,
  updateDocumentRequest,
  deleteDocumentRequest,
};
