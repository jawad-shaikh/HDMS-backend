const prisma = require('../../config/database.config');

const getAllExpiryDocuments = async (filter) => {
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

module.exports = {
  getAllExpiryDocuments,
};
