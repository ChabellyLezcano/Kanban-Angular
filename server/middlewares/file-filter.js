const path = require('path');
module.exports = function (req, file, cb) {

    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
        return cb(null, true);
    }
    cb("Error: File upload only supports the following filetypes - " + filetypes);
}