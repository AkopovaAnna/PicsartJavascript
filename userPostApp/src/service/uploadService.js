
const multer = require('multer');

const UploadService = {
    storage: multer.diskStorage({
        filename: function (req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now() + '.' + UploadService.getFileExtension(file));
        }
    }),

    filter: (req, file, callback) => {
        const fileExtension = UploadService.getFileExtension(file);
        const typeAllowed = process.env.EXTENSIONS.split(" ").some(e => e === fileExtension);

        if (!typeAllowed) {
            callback(new Error('Invalid file type.'));
            return;
        }

        callback(null, true);//undefined
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

        const upload = multer({storage, fileFilter, limits}).any(fieldName);

        return function (req, res, next) {
            upload(req, res, (err) => {
                if (err) return res.status(400).send(err.message);

                next();
            });
        };
    }
}

module.exports = UploadService.uploadImage;
// const filter = function (req, file, callback) {
//     const fileExtension = getFileExtension(file);
//     const typeAllowed = process.env.EXTENSIONS.split(" ").some(e => e === fileExtension);
//
//     if (!typeAllowed) {
//         callback(new Error('Invalid file type.'));
//         return;
//     }
//
//     callback(null, true);//undefined
// }


// const limits = {
//     fileSize: process.env.MAXSIZE
// }


// function getFileExtension(file) {
//     const index = file.originalname.lastIndexOf('.') + 1;
//     return file.originalname.substr(index).toLowerCase();
// }