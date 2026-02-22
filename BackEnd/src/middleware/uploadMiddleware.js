import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (
      file.fieldname === "images" &&
      (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
    ) {
      cb(null, true);
    } 
    else if (
      file.fieldname === "docs" &&
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } 
    else {
      cb(new Error("Invalid file type or field"));
    }
  }
});