const {
  okResponse,
  createSuccessResponse,
  updateSuccessResponse,
  deleteSuccessResponse,
  serverErrorResponse,
} = require('generic-response');

const prisma = require('../../config/database.config');

const documentRepository = require('../../repositories/documents/documents');
const documentSubmissionsRepository = require('../../repositories/documents/submissions');
const userRepository = require('../../repositories/users/users');

const getAllDocumentSubmissions = async (req, res) => {
  const { userId, role: userRole } = req.user;

  try {
    if (userRole === 'ADMIN' || userRole === 'HR') {
      let documents = await documentSubmissionsRepository.getAllDocumentSubmissions({
        status: 'PENDING',
      });

      const response = okResponse(documents);
      return res.status(response.status.code).json(response);
    }

    if (userRole === 'STAFF' || userRole === 'HOD') {
      let documents = await documentSubmissionsRepository.getAllDocumentSubmissions({
        userId,
        status: 'PENDING',
      });

      const response = okResponse(documents);
      return res.status(response.status.code).json(response);
    }
  } catch (error) {
    const response = serverErrorResponse();
    return res.status(response.status.code).json(response);
  }
};

const getSingleDocumentSubmission = async (req, res) => {
  const id = Number(req.params.id);

  try {
    let document = await documentSubmissionsRepository.getSingleDocumentSubmission(id);

    const response = okResponse(document);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error);
    return res.status(response.status.code).json(response);
  }
};

const getSingleDocumentSubmissionDocuments = async (req, res) => {
  const id = Number(req.params.id);

  try {
    let document = await documentSubmissionsRepository.getSingleDocumentSubmissionDocuments(id);
    await documentRepository.deleteDocuments(id);

    document.documents.forEach((doc) => {
      doc.imageUrl = `${process.env.BACKEND_URL}/staff-documents/${doc.fileName}`;
      delete doc.fileName;
    });

    const response = okResponse(document);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error);
    return res.status(response.status.code).json(response);
  }
};

const createDocumentSubmission = async (req, res) => {
  const { userId } = req.user;
  const data = req.body;
  const documents = req.files;

  try {
    const submittedDocument = await documentSubmissionsRepository.createDocumentSubmission({
      ...data,
      documentRequestId: Number(data.documentRequestId),
      userId,
    });

    await documentRepository.createDocuments(submittedDocument.id, documents);

    const user = await userRepository.getSingleUsers(userId);

    await prisma.documentHistory.create({
      data: {
        uploadedDocumentId: submittedDocument.id,
        action: `Document uploaded by ${user.firstName} ${user.lastName}`,
      },
    });

    const response = createSuccessResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    console.log(error);
    const response = serverErrorResponse(error);
    return res.status(response.status.code).json(response);
  }
};

const updateDocumentSubmission = async (req, res) => {
  const id = Number(req.params.id);
  const data = req.body;
  const documents = req.files;

  try {
    await documentSubmissionsRepository.updateDocumentSubmission(id, { ...data, status: 'PENDING', isExpired: false });

    if (documents.length) {
      await documentRepository.deleteDocuments(id);
      await documentRepository.createDocuments(id, documents);
    }

    await prisma.documentHistory.create({
      data: {
        uploadedDocumentId: id,
        action: `Document renewed`,
      },
    });

    const response = updateSuccessResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    console.log(error);
    const response = serverErrorResponse(error);
    return res.status(response.status.code).json(response);
  }
};

const deleteDocumentSubmission = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const document = await documentSubmissionsRepository.deleteDocumentSubmission(id);

    const response = deleteSuccessResponse(document);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error);
    return res.status(response.status.code).json(response);
  }
};

// Approve or Reject Document

const approveDocumentSubmission = async (req, res) => {
  const id = Number(req.params.id);
  const { userId } = req.user;

  try {
    const document = await documentSubmissionsRepository.approveDocumentSubmission(id);

    const user = await userRepository.getSingleUsers(userId);

    await prisma.documentHistory.create({
      data: {
        uploadedDocumentId: id,
        action: `Approved by ${user.firstName} ${user.lastName}`,
      },
    });

    const response = okResponse(document);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error);
    return res.status(response.status.code).json(response);
  }
};

const rejectDocumentSubmission = async (req, res) => {
  const { userId } = req.user;
  const id = Number(req.params.id);

  try {
    const document = await documentSubmissionsRepository.rejectDocumentSubmission(id);

    const user = await userRepository.getSingleUsers(userId);

    await prisma.documentHistory.create({
      data: {
        uploadedDocumentId: id,
        action: `Rejected by ${user.firstName} ${user.lastName}`,
      },
    });

    const response = okResponse(document);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error);
    return res.status(response.status.code).json(response);
  }
};

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
