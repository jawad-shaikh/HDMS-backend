const jwt = require('jsonwebtoken');
const { badRequestResponse, unauthorizedResponse } = require('generic-response');

const authRequired = async (req, res, next) => {
  const authorizationHeader = req.headers?.authorization;

  if (!authorizationHeader) {
    const response = badRequestResponse('Authorization Token not provided.');
    return res.status(response.status.code).json(response);
  }

  const token = authorizationHeader.split(' ')[1];

  if (!token) {
    const response = badRequestResponse('Invalid token format.');
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
