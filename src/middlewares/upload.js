const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        const nameFormat = `${Date.now()}-${file.fieldname}${path.extname(
            file.originalname
        )}`;
        cb(null, nameFormat);
    },
});

const maxSize = 2 * 1000 * 1000;

const fileFilter = (req, file, cb) => {
    const acceptedFileType = /jpg|jpeg|gif|png/;
    const isFileTypeAccepted = acceptedFileType.test(
        path.extname(file.originalname).toLowerCase()
    );

    if (!isFileTypeAccepted) return cb(new Error('Error: Image Only!'));
    cb(null, true);
};

const multerUpload = multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter,
});

module.exports = multerUpload;
