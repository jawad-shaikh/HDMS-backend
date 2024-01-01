const express = require('express');

const validateRequest = require('../../middlewares/validateRequest.middleware');
const authRequired = require('../../middlewares/authRequired.middleware');

const documentExpiryValidations = require('../../validations/documents/expiry');
const documentExpiryControllers = require('../../controllers/documents/expiry.controllers');

const router = express.Router();

router.get(
  '/',
  authRequired,
  validateRequest(documentExpiryValidations.getAllExpiryDocuments),
  documentExpiryControllers.getAllExpiryDocuments,
);

module.exports = router;
