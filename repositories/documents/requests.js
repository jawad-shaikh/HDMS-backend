const prisma = require('../../config/database.config');

const getAllDocumentRequests = async (filter) => {
  try {
    const documents = await prisma.documentRequests.findMany(filter);
    return documents;
  } catch (error) {
    throw error;
  }
};

const getSingleDocumentRequest = async (id) => {
  try {
    const document = await prisma.documentRequests.findFirst({ where: { id } });
    return document;
  } catch (error) {
    throw error;
  }
};

const createDocumentRequest = async (data) => {
  try {
    const document = await prisma.documentRequests.create({ data });
    return document;
  } catch (error) {
    throw error;
  }
};

const updateDocumentRequest = async (id, data) => {
  try {
    const document = await prisma.documentRequests.update({ data, where: { id } });
    return document;
  } catch (error) {
    throw error;
  }
};

const deleteDocumentRequest = async (id) => {
  try {
    const document = await prisma.documentRequests.delete({ where: { id } });
    return document;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllDocumentRequests,
  getSingleDocumentRequest,
  createDocumentRequest,
  updateDocumentRequest,
  deleteDocumentRequest,
};
