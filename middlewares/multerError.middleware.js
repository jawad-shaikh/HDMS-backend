const { serverErrorResponse, badRequestResponse } = require('generic-response');

const multerErrorHandler = (err, req, res, next) => {
  console.log('Multer Error Handler:', err);

  if (err instanceof multer.MulterError) {
    const response = badRequestResponse(err.message);
    return res.status(response.status.code).json(response);
  } else if (err) {
    const response = serverErrorResponse();
    return res.status(response.status.code).json(response);
  }

  next();
};

module.exports = multerErrorHandler;
