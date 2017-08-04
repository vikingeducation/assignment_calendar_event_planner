const express = require("express");
const router = express.Router();
let db = require("../models");
let Users = db.user;

router.get("/", (req, res) => {
  Users.findAll()
    .then(users => {
      res.render("users", { users });
    })
    .catch(err => {
      res.send(err);
    });
});

router.post("/users/:id", (req, res) => {
  res.end("post request :(");
});

router.get("/users/:id/edit", (req, res) => {
  Users.findById(req.params.id).then(user => {
    res.render("user_edit", { user });
  });
});

router.put("/users/:id", (req, res) => {
  //do stuff with database
  .then(()=> {
  req.method = "GET";
  res.redirect(`/users/${req.params.id}`);
  })
});

module.exports = router;
