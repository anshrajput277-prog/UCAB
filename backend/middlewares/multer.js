const multer = require('multer');
const fs = require('fs')


const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  
filename: (req, file, cb) => {
  const uniqueSuffix = Date.now() + '-' + file.originalname;
  cb(null, uniqueSuffix);
}
});

const upload = multer({ storage });

module.exports = upload
