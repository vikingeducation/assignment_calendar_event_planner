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

module.exports = router;
