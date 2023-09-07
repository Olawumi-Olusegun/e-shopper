import multer from 'multer';
import fs from 'fs'

const publicPath = "./public/uploads";

    if(!fs.existsSync(publicPath)) {
        fs.mkdirSync(publicPath);
    }

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, publicPath);
    },
    filename: function(req, file, cb) {

        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);   
        cb(null,  uniqueSuffix + '_' + file.originalname);

    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb("Unsupported file format! Upload only jpg/jpeg/png", false);
    }
}

const upload = multer({
    storage,
    limites: { fileSize: 1024 * 1024},
    fileFilter 
});

export default upload;