const express = require("express");
const router = express.Router();
let db = require("../models");
let Users = db.user;

router.get("/", (req, res) => {
  Users.findAll().then((users) => {

    res.render("users", {users})
  }).catch((err) => {
    res.send(err)
  })
});

router.put("//users/:id", (req, res) => {

})


module.exports = router;
