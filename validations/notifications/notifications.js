const Joi = require('joi');

const getAllNotifications = Joi.object({
  query: Joi.object({
    seen: Joi.boolean().optional(),
  }),
  params: Joi.object({}),
  body: Joi.object({}),
});

const markAllAsSeen = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({}),
});

module.exports = {
  getAllNotifications,
  markAllAsSeen,
};
