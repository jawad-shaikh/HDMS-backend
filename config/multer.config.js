const path = require('path');
const multer = require('multer');

const allowedFileTypes = [
  'image/jpeg',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const staffDocumentsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/staff-documents');
  },
  fileFilter: (req, file, cb) => {
    console.log('File Type Check:', file.mimetype);

    if (allowedFileTypes.includes(file.mimetype)) {
      console.log('first');
      cb(null, true);
    } else {
      console.log('not first');
      cb(new Error('Invalid file type. Only JPG and PDF files are allowed.'));
    }
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const finalFilename = `${file.fieldname}-${Date.now()}${fileExt}`;
    cb(null, finalFilename);
  },
});

module.exports = {
  staffDocumentsStorage,
};
