const { unauthorizedResponse, okResponse, serverErrorResponse } = require('generic-response');

const notificationRepository = require('../../repositories/notifications/notifications');

const getAllNotifications = async (req, res) => {
  const { userId } = req.user;
  const { seen } = req.query;

  try {
    const filter = { userId };

    if (seen) filter.seen = seen;

    const notifications = await notificationRepository.getAllNotifications(filter);

    const response = okResponse(notifications);
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error);
    return res.status(response.status.code).json(response);
  }
};

const markAllAsSeen = async (req, res) => {
  const { userId } = req.user;

  try {
    await notificationRepository.markAllAsSeen(userId);

    const response = okResponse(null, 'All read!');
    return res.status(response.status.code).json(response);
  } catch (error) {
    const response = serverErrorResponse(error);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getAllNotifications,
  markAllAsSeen,
};
