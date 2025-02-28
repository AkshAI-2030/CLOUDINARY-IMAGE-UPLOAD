const isFilePresent = (req, res, next) => {
  if (!req.files) {
    return res
      .status(400)
      .json({ description: "File not present in the request body" });
  }
  console.log(req.files);
  if (Array.isArray(req.files) && req.files.length === 0) {
    return res
      .status(400)
      .json({ error: { description: "No file was uploaded" } });
  }
  next();
};

module.exports = { isFilePresent };
