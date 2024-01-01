const prisma = require('../../config/database.config');

const getAllNotifications = async (filter) => {
  try {
    const notifications = await prisma.notifications.findMany({
      where: filter,
    });

    return notifications;
  } catch (error) {
    throw error;
  }
};

const markAllAsSeen = async (userId) => {
  try {
    await prisma.notifications.updateMany({
      data: {
        hasSeen: true,
      },
      where: { userId },
    });
  } catch (error) {
    throw error;
  }
};

const sendNotification = async (userId, title, description) => {
  try {
    await prisma.notifications.create({
      data: {
        userId,
        title,
        description,
      },
    });
  } catch (error) {
    throw error;
  }
};

const markAllNotificationsAsSeen = async (userId) => {
  try {
    await prisma.notifications.update({
      data: {
        hasSeen: true,
      },
      where: { userId },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllNotifications, markAllAsSeen, sendNotification, markAllNotificationsAsSeen };
