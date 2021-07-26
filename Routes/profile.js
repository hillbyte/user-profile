const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//*importing post schema
require("../Model/profile");
let POST = mongoose.model("profile");
router.get("/profiles", (req, res) => {
  POST.find({})
    .sort({ createdAt: "desc" })
    .lean()
    .then((profile) => {
      // console.log(profile);
      res.render("user/profiles", { profile });
    })
    .catch((err) => console.log(err));
});
//==post method
router.post("/new-profile", (req, res) => {
  let { name, email, phone, dob, address, city, zip } = req.body;
  let newProfile = { name, email, phone, dob, address, city, zip };
  //save into database
  new POST(newProfile)
    .save()
    .then((post) => {
      res.redirect("/user/profiles", 301, () => {});
      //   res.render("user/profile");
    })
    .catch((err) => console.log(err));
});

module.exports = router;
