const multer = require('multer');
const { resolve, extname } =require('path');

module.exports = {
    fileFilter: (req, file, cb) => {
        if(file.mimetype !== 'text/plain') {
            return cb(new multer.MulterError('Apenas txt'));
        }

        return cb(null, true);
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, resolve(__dirname, '..', 'uploads'));
        },

        filename: (req, file, cb) => {
            cb(null, 'input.txt');
        }
    })
};