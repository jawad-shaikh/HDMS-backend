const prisma = require('../../config/database.config');

const createDocuments = async (uploadedDocumentId, documents) => {
  const data = documents.map((document) => {
    return {
      uploadedDocumentId: uploadedDocumentId,
      originalName: document.originalname,
      fileName: document.filename,
      mimetype: document.mimetype,
      size: document.size,
    };
  });

  try {
    await prisma.documents.createMany({
      data,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateDocuments = async (uploadedDocumentId, data) => {
  try {
    await prisma.documents.updateMany({
      data,
      where: { uploadedDocumentId },
    });
  } catch (error) {
    throw error;
  }
};

const deleteDocuments = async (uploadedDocumentId) => {
  try {
    const a = await prisma.documents.deleteMany({
      where: { uploadedDocumentId },
    });
  } catch (error) {
    throw error;
  }
};

const createUploadedDocumentHistory = async (UploadedDocumentId, ActionByUserId, Action) => {
  try {
    await prisma.documentHistory.create({
      UploadedDocumentId,
      ActionByUserId,
      Action,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createDocuments,
  updateDocuments,
  deleteDocuments,
  createUploadedDocumentHistory,
};
