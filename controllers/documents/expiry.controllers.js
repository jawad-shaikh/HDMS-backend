const { okResponse, serverErrorResponse } = require('generic-response');

const documentExpiryRepository = require('../../repositories/documents/expiry');
const userRepository = require('../../repositories/users/users');

const getAllExpiryDocuments = async (req, res) => {
  const { userId, role: userRole } = req.user;
  const { department } = req.query;

  try {
    // all expired documents
    if (userRole === 'ADMIN' || userRole === 'HR') {
      let documents = await documentExpiryRepository.getAllExpiryDocuments({
        isExpired: true,
      });

      const response = okResponse(documents);
      return res.status(response.status.code).json(response);
    }

    // department expired documents
    if (userRole === 'HOD' && department === 'true') {
      const hod = await userRepository.getSingleUsers(userId);

      let documents = await documentExpiryRepository.getAllExpiryDocuments({
        user: {
          departmentId: hod.departmentId,
        },
        isExpired: true,
      });

      const response = okResponse(documents);
      return res.status(response.status.code).json(response);
    }

    // my expired documents
    if (userRole === 'STAFF' || userRole === 'HOD') {
      let documents = await documentExpiryRepository.getAllExpiryDocuments({
        userId: userId,
        isExpired: true,
      });

      const response = okResponse(documents);
      return res.status(response.status.code).json(response);
    }
  } catch (error) {
    const response = serverErrorResponse();
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getAllExpiryDocuments,
};
