const express = require('express');

const validateRequest = require('../../middlewares/validateRequest.middleware');
const authRequired = require('../../middlewares/authRequired.middleware');

const documentSubmissionValidations = require('../../validations/documents/submissions');
const documentSubmissionControllers = require('../../controllers/documents/submissions.controllers');

const router = express.Router();

const upload = multer({ dest: 'uploads/staff-documents' });

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
router.post(
  '/',
  authRequired,
  validateRequest(documentSubmissionValidations.createDocumentSubmission),
  upload.array('documents'),
  documentSubmissionControllers.createDocumentSubmission,
);
router.patch(
  '/:id',
  authRequired,
  validateRequest(documentSubmissionValidations.updateDocumentSubmission),
  upload.array('documents'),
  documentSubmissionControllers.updateDocumentSubmission,
);
router.delete(
  '/:id',
  authRequired,
  validateRequest(documentSubmissionValidations.deleteDocumentSubmission),
  documentSubmissionControllers.deleteDocumentSubmission,
);

module.exports = router;
