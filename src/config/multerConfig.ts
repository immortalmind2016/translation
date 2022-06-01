import multer from "multer";
const upload = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "text/plain") {
      cb(null, true);
    } else {
      return cb(new Error("Invalid upload: filename should be .txt format "));
    }
  },
});
export default upload;
