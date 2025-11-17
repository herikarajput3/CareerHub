const multer = require('multer');

// use memoryStorage (file will be available as req.file.buffer)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  }
});

// export middleware function for single file named "file"
module.exports = {
  singleUpload: upload.single('file')
};
