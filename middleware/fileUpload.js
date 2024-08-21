const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const mimeType = file.mimetype;
        let folder = '';
        if (mimeType.includes('image')) {
            folder = './uploads/images';
        } else if (mimeType.includes('video')) {
            folder = './uploads/videos';
        } else {
            cb(new Error('Unsupported file type'), null);
            return;
        }
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const uploads = multer({ storage });
module.exports = uploads;