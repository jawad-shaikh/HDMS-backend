const multer = require('multer');

const gamesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/staff-documents');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = 'document-' + uniqueSuffix + '.' + file.originalname.split('.').pop();

    req.generatedFileName = fileName;
    cb(null, fileName);
  },
});

module.exports = {
  gamesStorage,
};
