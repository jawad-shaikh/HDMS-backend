const prisma = require('../../config/database.config');

const getAllDocumentSubmissions = async (filter) => {
  try {
    const documents = await prisma.uploadedDocuments.findMany({
      include: {
        user: true,
        documents: {
          select: {
            id: true,
            fileName: true,
            size: true,
          },
        },
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

const getSingleDocumentSubmission = async (id) => {
  try {
    const document = await prisma.uploadedDocuments.findFirst({
      include: {
        Documents: true,
        user: true,
      },
      where: { id },
    });
    return document;
  } catch (error) {
    throw error;
  }
};

const getSingleDocumentSubmissionDocuments = async (id) => {
  try {
    const document = await prisma.uploadedDocuments.findFirst({
      select: {
        id: true,
        documents: {
          select: {
            originalName: true,
            fileName: true,
          },
        },
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
    console.log(error);
    throw error;
  }
};

const updateDocumentSubmission = async (id, data) => {
  try {
    const document = await prisma.uploadedDocuments.update({ data, where: { id } });
    return document;
  } catch (error) {
    console.log(error);
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

// Approve or Reject Document

const approveDocumentSubmission = async (id) => {
  try {
    const document = await prisma.uploadedDocuments.update({
      data: {
        status: 'APPROVED',
      },
      where: { id },
    });

    return document;
  } catch (error) {
    throw error;
  }
};

const rejectDocumentSubmission = async (id) => {
  try {
    const document = await prisma.uploadedDocuments.update({
      data: {
        status: 'REJECTED',
      },
      where: { id },
    });

    return document;
  } catch (error) {
    throw error;
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
