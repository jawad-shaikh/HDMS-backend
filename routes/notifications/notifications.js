const express = require('express');

const authRequired = require('../../middlewares/authRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const notificationValidations = require('../../validations/notifications/notifications');
const notificationControllers = require('../../controllers/notifications/notifications.controllers');

const router = express.Router();

router.get(
  '/',
  authRequired,
  validateRequest(notificationValidations.getAllNotifications),
  notificationControllers.getAllNotifications,
);
router.post(
  '/mark-all-as-seen',
  authRequired,
  validateRequest(notificationValidations.markAllAsSeen),
  notificationControllers.markAllAsSeen,
);

module.exports = router;
