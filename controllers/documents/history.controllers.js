const { okResponse, serverErrorResponse } = require('generic-response');

const documentSubmissionsRepository = require('../../repositories/documents/history');

const getAllDocumentHistory = async (req, res) => {
  try {
    let documents = await documentSubmissionsRepository.getAllDocumentHistory();

    const response = okResponse(documents);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse();
    return res.status(response.status.code).json(response);
  }
};

const getSingleDocumentHistory = async (req, res) => {
  const id = Number(req.params.id);

  try {
    let document = await documentSubmissionsRepository.getSingleDocumentHistory(id);

    const response = okResponse(document);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getAllDocumentHistory,
  getSingleDocumentHistory,
};
