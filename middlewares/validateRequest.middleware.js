const { badRequestResponse } = require('generic-response');

const logger = require('../config/logger.config');

const validateRequest = (schema) => (req, res, next) => {
  const { body, params, query } = req;

  try {
    const { error } = schema.validate({ body, params, query }, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map((err) => err.message);
      const response = badRequestResponse(errorMessage);
      return res.status(response.status.code).json(response);
    }
    next();
  } catch (error) {
    logger.error(error);
  }
};

module.exports = validateRequest;
