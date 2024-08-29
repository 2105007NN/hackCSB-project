import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public");
  },
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
  },
});


// app.use(express.static(path.join(__dirname, './public')));



export const upload = multer({ storage: storage });