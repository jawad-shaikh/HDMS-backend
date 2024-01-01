const prisma = require('../config/database.config');

const documentSubmissionsRepository = require('../repositories/documents/submissions');
const notificationRepository = require('../repositories/notifications/notifications');
const userRepository = require('../repositories/users/users');

const checkForExpiredDocuments = async () => {
  console.log('cron');
  const today = new Date();

  const allAdminUsers = await userRepository.getAllUsers({
    role: 'ADMIN',
  });

  const allHrUsers = await userRepository.getAllUsers({
    role: 'HR',
  });

  const submittedDocuments = await documentSubmissionsRepository.getAllDocumentSubmissions({
    isExpired: false,
    expireDate: {
      lte: today,
    },
  });

  for (const submittedDocument of submittedDocuments) {
    const expiredDoc = await prisma.uploadedDocuments.update({
      data: { isExpired: true },
      where: { id: submittedDocument.id },
    });

    await prisma.documentHistory.create({
      data: {
        uploadedDocumentId: expiredDoc.id,
        action: `Document expired`,
      },
    });

    await notificationRepository.sendNotification(
      submittedDocument.userId,
      'Document Expired',
      `${submittedDocument.documentRequest.title} has been expired!`,
    );

    for (const admin of allAdminUsers) {
      await notificationRepository.sendNotification(
        admin.id,
        'Document Expired',
        `${submittedDocument.documentRequest.title} has been expired of ${submittedDocument.user.firstName} ${submittedDocument.user.lastName}!`,
      );
    }

    for (const hr of allHrUsers) {
      await notificationRepository.sendNotification(
        hr.id,
        'Document Expired',
        `${submittedDocument.documentRequest.title} has been expired of ${submittedDocument.user.firstName} ${submittedDocument.user.lastName}!`,
      );
    }

    const allHodUsersOfThisDepartment = await userRepository.getAllUsers({
      role: 'HOD',
      departmentId: submittedDocument.user.departmentId,
    });

    for (const hod of allHodUsersOfThisDepartment) {
      await notificationRepository.sendNotification(
        hod.id,
        'Document Expired',
        `${submittedDocument.documentRequest.title} has been expired of ${submittedDocument.user.firstName} ${submittedDocument.user.lastName}!`,
      );
    }
  }
};

module.exports = checkForExpiredDocuments;
