var express = require("express");
var router = express.Router();

//allow usage of database via sequelizer
var models = require("../models");
var User = models.User;
var sequelize = models.sequelize;

/* GET users listing. */
router.get("/", function(req, res, next) {
  User.findAll().then(users => {
    console.log(users);
    res.render("userindex", {users: users});
  });
});

router.get("/new", function(req, res, next) {
  res.render("newuser");
});

router.post("/new", function(req, res, next) {
  console.log("post starting");
  User.create({
    fname: req.body.firstname,
    lname: req.body.lastname,
    username: req.body.username,
    email: req.body.email
  })
    .then(user => {
      res.redirect(`/${user.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get("/:id", function(req, res, next) {
  User.findById(req.params.id).then(user => {
    console.log(user);
    res.render("showuser", {
      user: user
    });
  });
});

module.exports = router;
