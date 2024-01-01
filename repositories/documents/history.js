const prisma = require('../../config/database.config');

const getAllDocumentHistory = async (filter) => {
  try {
    const documents = await prisma.uploadedDocuments.findMany({
      include: {
        user: true,
        documentHistory: true,
        documentRequest: {
          include: {
            createdBy: true,
          },
        },
      },
      where: filter,
    });
    return documents;
  } catch (error) {
    throw error;
  }
};

const getSingleDocumentHistory = async (id) => {
  try {
    const document = await prisma.uploadedDocuments.findFirst({ where: { id } });
    return document;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllDocumentHistory,
  getSingleDocumentHistory,
};
