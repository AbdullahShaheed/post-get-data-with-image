const express = require("express");
const app = express();
const products = require("./routes/products");

//db
require("./db")();

//server
app.listen(3001, () => console.log("Listening on port 3001.."));

//middlewares and routes
app.use("/", products);
