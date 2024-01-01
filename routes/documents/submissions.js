const express = require('express');
const multer = require('multer');

const { staffDocumentsStorage } = require('../../config/multer.config');

const validateRequest = require('../../middlewares/validateRequest.middleware');
const authRequired = require('../../middlewares/authRequired.middleware');

const documentSubmissionValidations = require('../../validations/documents/submissions');
const documentSubmissionControllers = require('../../controllers/documents/submissions.controllers');

const router = express.Router();

const upload = multer({ storage: staffDocumentsStorage });

router.get(
  '/',
  authRequired,
  validateRequest(documentSubmissionValidations.getAllDocumentSubmissions),
  documentSubmissionControllers.getAllDocumentSubmissions,
);
router.get(
  '/:id',
  authRequired,
  validateRequest(documentSubmissionValidations.getSingleDocumentSubmission),
  documentSubmissionControllers.getSingleDocumentSubmission,
);
router.get(
  '/:id/docs',
  authRequired,
  validateRequest(documentSubmissionValidations.getSingleDocumentSubmissionDocuments),
  documentSubmissionControllers.getSingleDocumentSubmissionDocuments,
);
router.post(
  '/',
  authRequired,
  upload.array('documents'),
  validateRequest(documentSubmissionValidations.createDocumentSubmission),
  documentSubmissionControllers.createDocumentSubmission,
);
router.patch(
  '/:id',
  authRequired,
  upload.array('documents'),
  validateRequest(documentSubmissionValidations.updateDocumentSubmission),
  documentSubmissionControllers.updateDocumentSubmission,
);
router.delete(
  '/:id',
  authRequired,
  validateRequest(documentSubmissionValidations.deleteDocumentSubmission),
  documentSubmissionControllers.deleteDocumentSubmission,
);

// Approve or Reject Document

router.patch(
  '/:id/approve',
  authRequired,
  validateRequest(documentSubmissionValidations.approveDocumentSubmission),
  documentSubmissionControllers.approveDocumentSubmission,
);
router.patch(
  '/:id/reject',
  authRequired,
  validateRequest(documentSubmissionValidations.rejectDocumentSubmission),
  documentSubmissionControllers.rejectDocumentSubmission,
);

module.exports = router;
