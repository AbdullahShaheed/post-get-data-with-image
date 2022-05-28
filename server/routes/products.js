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

//initialize upload
const upload = multer({
  storage: storage,
});

//POST
router.post("/", upload.single("productImage"), async (req, res) => {
  // try {
  //   await db.query(
  //     "INSERT INTO products VALUES (DEFAULT, 'tomato', '1', 'fake path');"
  //   );
  //   res.send("Saved.");
  // } catch (err) {
  //   res.send(err.message);
  // }
  res.send("image saved");
});

//GET
router.get("/", (req, res) => {
  res.send({ name: "a", price: 10 });
});

router.get("/images", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/uploads/photo.png")); //ok
});

module.exports = router;
