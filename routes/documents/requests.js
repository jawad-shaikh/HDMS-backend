const express = require('express');

const validateRequest = require('../../middlewares/validateRequest.middleware');
const authRequired = require('../../middlewares/authRequired.middleware');

const documentRequestValidations = require('../../validations/documents/requests');
const documentRequestControllers = require('../../controllers/documents/requests.controllers');

const router = express.Router();

router.get(
  '/',
  authRequired,
  validateRequest(documentRequestValidations.getAllDocumentRequests),
  documentRequestControllers.getAllDocumentRequests,
);
router.get(
  '/:id',
  authRequired,
  validateRequest(documentRequestValidations.getSingleDocumentRequest),
  documentRequestControllers.getSingleDocumentRequest,
);
router.post(
  '/',
  authRequired,
  validateRequest(documentRequestValidations.createDocumentRequest),
  documentRequestControllers.createDocumentRequest,
);
router.patch(
  '/:id',
  authRequired,
  validateRequest(documentRequestValidations.updateDocumentRequest),
  documentRequestControllers.updateDocumentRequest,
);
router.delete(
  '/:id',
  authRequired,
  validateRequest(documentRequestValidations.deleteDocumentRequest),
  documentRequestControllers.deleteDocumentRequest,
);

module.exports = router;
