const {
  okResponse,
  createSuccessResponse,
  updateSuccessResponse,
  deleteSuccessResponse,
  serverErrorResponse,
} = require('generic-response');

const documentRequestsRepository = require('../../repositories/documents/requests');
const usersRepository = require('../../repositories/users/users');
const notificationsRepository = require('../../repositories/notifications/notifications');

const getAllDocumentRequests = async (req, res) => {
  const { userId, role: userRole } = req.user;

  try {
    if (userRole === 'ADMIN' || userRole === 'HR') {
      let documents = await documentRequestsRepository.getAllDocumentRequests();

      const response = okResponse(documents);
      return res.status(response.status.code).json(response);
    }

    if (userRole === 'STAFF' || userRole === 'HOD') {
      const notSubmittedRequests = await documentRequestsRepository.getAllDocumentRequests({
        NOT: {
          UploadedDocuments: {
            some: {
              userId,
            },
          },
        },
      });

      // const submittedRequestsButNotApproved = await documentRequestsRepository.getAllDocumentRequests({
      //   UploadedDocuments: {
      //     some: {
      //       userId,
      //       status: {
      //         not: 'APPROVED',
      //       },
      //     },
      //   },
      // });

      // const documents = [...notSubmittedRequests, ...submittedRequestsButNotApproved];

      const response = okResponse(notSubmittedRequests);
      return res.status(response.status.code).json(response);
    }
  } catch (error) {
    const response = serverErrorResponse();
    return res.status(response.status.code).json(response);
  }
};

const getSingleDocumentRequest = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    let document = await documentRequestsRepository.getSingleDocumentRequest(id);

    const response = okResponse(document);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error);
    return res.status(response.status.code).json(response);
  }
};

const createDocumentRequest = async (req, res) => {
  const data = req.body;
  const { userId } = req.user;

  try {
    const document = await documentRequestsRepository.createDocumentRequest(userId, data);

    const response = createSuccessResponse(document);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error);
    return res.status(response.status.code).json(response);
  }
};

const updateDocumentRequest = async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;

  try {
    const document = await documentRequestsRepository.updateDocumentRequest(id, data);

    const response = updateSuccessResponse(document);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error);
    return res.status(response.status.code).json(response);
  }
};

const deleteDocumentRequest = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const document = await documentRequestsRepository.deleteDocumentRequest(id);

    const response = deleteSuccessResponse(document);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getAllDocumentRequests,
  getSingleDocumentRequest,
  createDocumentRequest,
  updateDocumentRequest,
  deleteDocumentRequest,
};
