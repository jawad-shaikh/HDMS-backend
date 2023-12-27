const { forbiddenResponse } = require('generic-response');

const restrictToAdmins = (req, res, next) => {
  const { role } = req.user;

  if (role === 'admin') {
    next();
  } else {
    const response = forbiddenResponse();
    return res.status(response.status.code).json(response);
  }
};

module.exports = restrictToAdmins;
