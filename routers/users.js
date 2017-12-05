"use strict";
// routers/users.js

const express = require("express");
const router = express.Router();
const models = require("./../models");
const User = models.User;
const sequelize = models.sequelize;

const onIndex = (req, res) => {
  User.findAll()
    .then(users => {
      res.render("users", { users });
    })
    .catch(e => res.status(500).send(e.stack));
};
router.get("/", onIndex);
router.get("/users", onIndex);
router.get("/users/:id", (req, res) => {
  // if (req.query._method === "delete") {
  //   res.redirect("/users/:id/delete");
  // }
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.render("user", { user });
      } else {
        res.send("404 Not Found.");
      }
    })
    .catch(err => res.status(500).send(err.stack));
});

router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/users", (req, res) => {
  let body = req.body;

  let userParams = {
    fname: body.user.fname,
    lname: body.user.lname,
    username: body.user.username,
    email: body.user.email
  };

  User.create(userParams)
    .then(user => {
      res.redirect(`/users/${user.id}`);
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});

router.delete("/users/:id", (req, res) => {
  User.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = "GET";
      res.redirect("/users");
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});

module.exports = router;
