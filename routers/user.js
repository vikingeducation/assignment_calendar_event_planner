var express = require("express");
var router = express.Router();
var models = require("./../models");
var User = models.User;
var sequelize = models.sequelize;

var onIndex = (req, res) => {
  User.findAll()
    .then(users => {
      res.render("users/start", { users });
    })
    .catch(e => res.status(500).send(e.stack));
};

var onNewUser = (req, res) => {
  res.render("users/newUser");
};

var onPostNewUser = (req, res) => {
  var body = req.body.user;
  var createParams = {
    fname: body.fname,
    lname: body.lname,
    username: body.username,
    email: body.email
  };

  User.create(createParams)
    .then(user => {
      res.redirect(`/user/${user.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
};

var oneUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.render("users/oneUser", { user });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
};

var editUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.render("users/edit", { user });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
};

var onUpdateUser = (req, res) => {
  var body = req.body.user;
  User.update(
    {
      fname: body.fname,
      lname: body.lname,
      username: body.username,
      email: body.email
    },
    {
      where: { id: req.params.id },
      limit: 1
    }
  )
    .then(() => {
      req.method = "GET";
      res.redirect(`/user/${req.params.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
};

var onDeleteUser = (req, res) => {
  User.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = "GET";
      res.redirect("/");
    })
    .catch(e => res.status(500).send(e.stack));
};

router.get("/", onIndex);
router.get("/user", onIndex);

router.get("/user/new", onNewUser);

router.post("/user/new", onPostNewUser);

router.get("/user/:id", oneUser);

router.get("/user/edit/:id", editUser);

router.put("/user/edit/:id", onUpdateUser);

router.delete("/user/delete/:id", onDeleteUser);

module.exports = router;
