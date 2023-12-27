const {
  okResponse,
  createSuccessResponse,
  updateSuccessResponse,
  deleteSuccessResponse,
  serverErrorResponse,
} = require('generic-response');

const documentSubmissionsRepository = require('../../repositories/documents/submissions');

const getAllDocumentSubmissions = async (req, res) => {
  const { userId, role: userRole } = req.user;

  try {
    if (userRole === 'ADMIN') {
      let documents = await documentSubmissionsRepository.getAllDocumentSubmissions();

      const response = okResponse(documents);
      return res.status(response.status.code).json(response);
    }

    if (userRole === 'STAFF') {
      let documents = await documentSubmissionsRepository.getAllDocumentSubmissions({
        where: { userId },
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

const createDocumentSubmission = async (req, res) => {
  const data = req.body;
  const { userId } = req.user;
  const files = req.files;

  try {
    console.log('files: ', files);

    const document = await documentSubmissionsRepository.createDocumentSubmission({
      ...data,
      userId,
    });

    const response = createSuccessResponse(document);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error);
    return res.status(response.status.code).json(response);
  }
};

const updateDocumentSubmission = async (req, res) => {
  const id = Number(req.params.id);
  const data = req.body;
  const files = req.files;

  try {
    console.log('files: ', files);

    const document = await documentSubmissionsRepository.updateDocumentSubmission(id, data);

    const response = updateSuccessResponse(document);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error);
    return res.status(response.status.code).json(response);
  }
};

const deleteDocumentSubmission = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const document = await documentSubmissionsRepository.deleteDocumentSubmission(id);

    const response = deleteSuccessResponse(document);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getAllDocumentSubmissions,
  getSingleDocumentSubmission,
  createDocumentSubmission,
  updateDocumentSubmission,
  deleteDocumentSubmission,
};
