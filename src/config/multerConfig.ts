import multer from "multer";
const upload = multer({
  fileFilter: (req, file, cb) => {
    console.log("🚀 ~ file: multerConfig.ts ~ line 4 ~ file", file);
    if (file.mimetype == "text/plain") {
      cb(null, true);
    } else {
      return cb(new Error("Invalid upload: filename should be .txt format "));
    }
  },
});
export default upload;
