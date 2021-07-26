const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const app = express();
require("dotenv").config();

// let db_name = "mongodb://localhost:27017/profile";
let db_name =
  "";

mongoose.connect(process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("db connected");
  }
);
app.set("view engine", "handlebars");
app.engine("handlebars", exphbs());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("./home");
});
let profile = require("./Routes/profile");
app.use("/user", profile);
app.listen(process.env.PORT || 3000, (err) => {
  if (err) throw err;
  console.log("Server at 3000");
});
