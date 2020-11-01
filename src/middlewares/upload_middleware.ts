import * as multer from "multer";
import { paths } from "../settings";
import { CustomError } from "../lib/errors";

const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb(new InvalidCSVFileError(file.originalname), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, paths.csvUploadLocation);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-test-app-${file.originalname}`);
  },
});

const upload: multer.Multer = multer({ storage, fileFilter: csvFilter });

export const uploadSingleFile = (req, res, next) => {
  return upload.single("file")(req, res, (err) => {
    let error = err;
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      error = new UploadMulterError();
    }
    return next(error);
  });
};

// *********************************************

export class UploadError extends CustomError {}

export class InvalidCSVFileError extends CustomError {
  constructor(filename) {
    super(`Please upload only csv file. ${filename} is not a csv.`, 500);
  }
}

export class UploadMulterError extends CustomError {
  constructor() {
    super("Upload field name must be named 'file'.", 400);
  }
}
