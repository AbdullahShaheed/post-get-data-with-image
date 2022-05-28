const express = require("express");
const app = express();
const products = require("./routes/products");

app.use("/", products);

app.listen(3001, () => console.log("Listening on port 3001.."));
