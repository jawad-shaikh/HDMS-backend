const Joi = require('joi');

const getAllDocumentSubmissions = Joi.object({
  query: Joi.object({
    start: Joi.date().optional(),
    end: Joi.date().optional(),
    startExpiry: Joi.date().optional(),
    endExpiry: Joi.date().optional(),
    hr: Joi.number().optional(),
  }),
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

const getSingleDocumentSubmissionDocuments = Joi.object({
  query: Joi.object({
    remove: Joi.string().valid('true', 'false').optional(),
  }),
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({}),
});

const createDocumentSubmission = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    documentRequestId: Joi.string().required(),
    expireDate: Joi.date().optional(),
  }),
});

const updateDocumentSubmission = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({
    expireDate: Joi.date().optional(),
  }),
});

const deleteDocumentSubmission = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({}),
});

// Approve or Reject Document

const approveDocumentSubmission = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({}),
});

const rejectDocumentSubmission = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({}),
});

module.exports = {
  getAllDocumentSubmissions,
  getSingleDocumentSubmission,
  getSingleDocumentSubmissionDocuments,
  createDocumentSubmission,
  updateDocumentSubmission,
  deleteDocumentSubmission,
  approveDocumentSubmission,
  rejectDocumentSubmission,
};
