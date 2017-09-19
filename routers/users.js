const express = require("express");
const router = express.Router();
let db = require("../models");
let Users = db.user;

router.get(["/", "/users"], (req, res) => {
  Users.findAll()
    .then(users => {
      res.render("users", { users });
    })
    .catch(err => {
      res.send(err);
    });
});

router.post("/users/create", (req, res) => {
  let userInfo = req.body.user;
  Users.create({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    username: userInfo.username,
    email: userInfo.email
  }).then(user => {
    res.redirect(`/users/${user.id}`);
  });
});

router.get("/users/create", (req, res) => {
  res.render("user_new");
});

router.get("/users/:id/edit", (req, res) => {
  Users.findById(req.params.id).then(user => {
    res.render("user_edit", { user });
  });
});

router.get("/users/:id", (req, res) => {
  Users.findById(req.params.id).then(user => {
    res.render("user_show", { user });
  });
});

router.put("/users/:id", (req, res) => {
  let userInfo = req.body.user;
  Users.update(
    {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      username: userInfo.username,
      email: userInfo.email
    },
    {
      where: { id: req.params.id }
    }
  ).then(() => {
    req.method = "GET";
    res.redirect(`/users/${req.params.id}`);
  });
});

router.delete("/users/:id", (req, res) => {
  Users.destroy({ where: { id: req.params.id } }).then(() => {
    req.method = "GET";
    res.redirect("/");
  });
});

module.exports = router;
