const express = require("express");
const { fileRouter } = require("./src/router/fileRouter.js");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(cors());
app.use("/src/uploads", express.static("/src/uploads"));

app.use("/files", fileRouter);
app.use("/", (req, res) => {
  res.send("Welcome to file/image upload");
});

const PORT = 4040;
app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
