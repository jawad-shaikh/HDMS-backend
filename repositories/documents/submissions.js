const prisma = require('../../config/database.config');

const getAllDocumentSubmissions = async (filter) => {
  try {
    const documents = await prisma.uploadedDocuments.findMany(filter);
    return documents;
  } catch (error) {
    throw error;
  }
};

const getSingleDocumentSubmission = async (id) => {
  try {
    const document = await prisma.uploadedDocuments.findFirst({
      include: {
        user: true,
        Documents: true,
      },
      where: { id },
    });
    return document;
  } catch (error) {
    throw error;
  }
};

const createDocumentSubmission = async (data) => {
  try {
    const document = await prisma.uploadedDocuments.create({ data });
    return document;
  } catch (error) {
    throw error;
  }
};

const updateDocumentSubmission = async (id, data) => {
  try {
    const document = await prisma.uploadedDocuments.update({ data, where: { id } });
    return document;
  } catch (error) {
    throw error;
  }
};

const deleteDocumentSubmission = async (id) => {
  try {
    const document = await prisma.uploadedDocuments.delete({ where: { id } });
    return document;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllDocumentSubmissions,
  getSingleDocumentSubmission,
  createDocumentSubmission,
  updateDocumentSubmission,
  deleteDocumentSubmission,
};
