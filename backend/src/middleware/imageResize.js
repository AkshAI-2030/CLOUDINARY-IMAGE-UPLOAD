const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const imageResize = async (req, res, next) => {
  try {
    const originalFilePath = req.files[0].path;
    const parsedPath = path.parse(originalFilePath);
    const outputFilePath = path.join(
      parsedPath.dir,
      "resized-" + parsedPath.name + ".jpeg"
    );

    await sharp(originalFilePath) //check sharp documentation for more understanding.
      .resize({ width: 1500 })
      .jpeg({
        quality: 100, // range from 0 to 100
        mozjpeg: true, //quality in maintained
        chromaSubsampling: "4:4:4",
        trellisQuantisation: true,
        overshootDeringing: true,
        optimiseScans: true,
        progressive: true, // loading speed.
      })
      .toFile(outputFilePath);

    req.files[0].path = outputFilePath;
    req.originalFilePath = originalFilePath;
    next(); //next to another middleware
  } catch (error) {
    return res.status(500).json({ error: { description: error.message } });
  }
};

module.exports = { imageResize };
