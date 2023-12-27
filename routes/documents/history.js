const express = require('express');

const validateRequest = require('../../middlewares/validateRequest.middleware');
const authRequired = require('../../middlewares/authRequired.middleware');

const documentHistoryValidations = require('../../validations/documents/history');
const documentHistoryControllers = require('../../controllers/documents/history.controllers');

const router = express.Router();

router.get(
  '/',
  authRequired,
  validateRequest(documentHistoryValidations.getAllDocumentHistory),
  documentHistoryControllers.getAllDocumentHistory,
);
router.get(
  '/:id',
  authRequired,
  validateRequest(documentHistoryValidations.getSingleDocumentHistory),
  documentHistoryControllers.getSingleDocumentHistory,
);

module.exports = router;
