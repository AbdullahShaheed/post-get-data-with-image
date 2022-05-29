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
  let p = {
    name: req.body.name,
    price: parseInt(req.body.price),
    image: req.file.filename,
  };
  try {
    await db.query("INSERT INTO products VALUES (DEFAULT, ?, ?, ?);", [
      p.name,
      p.price,
      p.image,
    ]);
    res.send("Saved.");
  } catch (err) {
    res.send(err.message);
  }
});

//GET
router.get("/:id", async (req, res) => {
  const product = await db.query(
    "SELECT * FROM products WHERE product_id = ?",
    [req.params.id]
  );
  res.send(product[0][0]);
});

router.get("/images/:id", async (req, res) => {
  const result = await db.query(
    "SELECT image FROM products WHERE product_id = ?",
    [req.params.id]
  );

  res.sendFile(path.join(__dirname, `../public/uploads/${result[0][0].image}`)); //result is complex
});

module.exports = router;
