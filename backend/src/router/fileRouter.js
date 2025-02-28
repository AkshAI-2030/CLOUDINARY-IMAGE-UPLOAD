const multer = require("multer");
const Router = require("express");
const { upload } = require("../middleware/fileUpload.js");
const { UNEXPECTED_FILE_TYPE } = require("../constants/file.js");
const { fileController } = require("../controllers/fileController.js");
const { imageResize } = require("../middleware/imageResize.js");
const { isFilePresent } = require("../middleware/validators/isFilePresent.js");
const { authenticateJWT } = require("../middleware/authentication.js");

const fileRouter = Router();

fileRouter.post(
  "/upload",
  authenticateJWT,
  function (req, res, next) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // Handle specific Multer errors
        if (err.code === UNEXPECTED_FILE_TYPE.code) {
          return res.status(400).json({
            error: { code: "UNEXPECTED_FILE_TYPE", description: err.field },
          });
        }

        // Fallback for other unknown Multer errors
        return res
          .status(400)
          .json({ error: { code: "MULTER_ERROR", description: err.message } });
      } else if (err) {
        // Handle non-Multer errors (generic server errors)
        return res
          .status(500)
          .json({ error: { code: "UPLOAD_ERROR", description: err.message } });
      }
      next();
      // Call next() if no error occurred
    });
  },

  fileController, // Final controller to handle the file upload logic
  isFilePresent, // Middleware to check if file exists
  imageResize // Middleware to resize images
);

module.exports = { fileRouter };
