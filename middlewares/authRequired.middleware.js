const jwt = require('jsonwebtoken');
const { badRequestResponse, unauthorizedResponse } = require('generic-response');

const authRequired = async (req, res, next) => {
  const token = req.headers?.authorization;

  if (!token) {
    const response = badRequestResponse('Authorization Token not provided.');
    return res.status(response.status.code).json(response);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedData) => {
    if (err) {
      const response = unauthorizedResponse('Invalid token.');
      return res.status(response.status.code).json(response);
    }

    req.user = decodedData;
    next();
  });
};

module.exports = authRequired;
