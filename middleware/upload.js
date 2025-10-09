const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination : (req , file , cb)=>{
        cb(null , "uploads/");
    },

    filename : (req , file , cb) =>{
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null  , uniqueName);
    },
});

const fileFilter = (req , file , cb)=>{
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

     if (extname && mimeType) {
    cb(null, true);
    } else {
    cb(new Error("Only images (jpg, jpeg, png, webp) are allowed"));
     }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter,
});

module.exports = upload;

 
