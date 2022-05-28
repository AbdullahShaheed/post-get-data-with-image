const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//init upload
const upload = multer({
  storage: storage,
});

//GET
router.get("/", (req, res) => {
  //get name and image filename from database then response to client
  //with the name and image data picked from server fs /public/uploads
  // and stream to client
  res.send({ name: "product 1", image: "AGhgAHGfHGahgfHAGFhjgf" });
});

//POST
router.post("/", upload.single("myImage"), (req, res) => {
  //save to database  name: req.body.name, image: req.file.filename
  res.send("saved to database");
});

module.exports = router;
