const { uploadToCloudinary } = require("../config/cloudinary.js");
const fs = require("fs");

const cloudinaryUpload = async (file) => {
  try {
    console.log("Cloudinary:", file);
    const cloudinaryResponse = await uploadToCloudinary(file.path);
    fs.unlink(file.path, (err) => {
      if (err) {
        console.log(err);
      }
    });
    return cloudinaryResponse;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { cloudinaryUpload };
