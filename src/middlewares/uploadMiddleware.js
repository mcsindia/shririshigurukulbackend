const multer = require('multer');
const path = require('path');

// Define storage for the uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder='news';
    if (req.uploadType === 'events') {
      folder = 'events';
    }else if(req.uploadType==='news'){
      folder ='news'
    }else if(req.uploadType==='blogs'){
      folder ='blogs'
    }else if(req.uploadType==='hero_banners'){
      folder ='hero_banners'
    }
    cb(null, path.join(__dirname, '..', 'uploads', 'website', folder));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const isValid = allowedTypes.test(file.mimetype);
  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({ storage: storage, fileFilter });

module.exports = upload;
