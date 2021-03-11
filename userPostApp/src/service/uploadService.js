const multer = require('multer');

const UploadService = {

    storage: multer.memoryStorage(),

    filter: (req, file, callback) => {
        const fileExtension = UploadService.getFileExtension(file);
        const typeAllowed = process.env.EXTENSIONS.split(" ").some(e => e === fileExtension);

        if (!typeAllowed) {
            callback(new Error('Invalid file type.'));
            return;
        }
        callback(null, true);

    },

    limits: {
        fileSize: process.env.MAXSIZE
    },

    getFileExtension: (file) => {
        const index = file.originalname.lastIndexOf('.') + 1;
        return file.originalname.substr(index).toLowerCase();
    },

    uploadImage: (fieldName) => {
        const storage = UploadService.storage;
        const fileFilter = UploadService.filter;
        const limits = UploadService.limits;

        const upload = multer({storage, fileFilter, limits}).array(fieldName, 10);

        return function (req, res, next) {
            upload(req, res, (err) => {
                if (err) return res.status(400).send(err.message);
                next();
            });
        };
    }
}

module.exports = UploadService.uploadImage;