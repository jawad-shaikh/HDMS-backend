const path = require('path');
const multer = require('multer');

const staffDocumentsStorage = multer.diskStorage({
  destination: 'uploads/documents',
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const finalFilename = `${file.fieldname}-${Date.now()}${fileExt}`;
    cb(null, finalFilename);
  },
});

module.exports = {
  staffDocumentsStorage,
};
