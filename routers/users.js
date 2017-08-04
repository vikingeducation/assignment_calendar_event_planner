var express = require("express");
var router = express.Router();
var models = require("./../models");
var users = models.users;
var sequelize = models.sequelize;

let grabUsers = (req, res) => {
  users.findAll().then(users => {
    res.render("users/index", { users });
  });
};
//grab all the users info
router.get("/", grabUsers);
router.get("/users", grabUsers);

//create new user
router.get("/users/new", (req, res) => {
  res.render("users/new");
});

router.get("/users/:id", (req, res) => {
  let id = req.params.id;
  users.findById(id).then(user => {
    res.render("users/show", { user });
  });
});

//edit page
router.get("/users/:id/edit", (req, res) => {
  let id = req.params.id;
  users.findById(id).then(user => {
    res.render("users/edit", { user });
  });
  console.log("GOT A A GET /EDIT");
});

router.put("/users/:id", (req, res) => {
  let id = req.params.id;
  let params = {
    fname: req.body.user.fname,
    lname: req.body.user.lname,
    email: req.body.user.email,
    username: req.body.user.username
  };
  users
    .update(params, {
      where: { id: id }
    })
    .then(user => {
      req.method = "GET";
      res.redirect(`/users/${id}`); //`users/${id}`
    });
});

router.delete("/users/:id", (req, res) => {
  let id = req.params.id;
  users
    .destroy({
      where: { id: id },
      limit: 1
    })
    .then(success => {
      if (success) {
        //TODO: enable flash message alerts.....later........
        res.redirect("/");
      } else {
        //display an error because success = 0
      }
    });
});

router.post("/users", (req, res) => {
  let params = {
    fname: req.body.user.fname.trim(),
    lname: req.body.user.lname.trim(),
    email: req.body.user.email.trim(),
    username: req.body.user.username.trim()
  };
  users
    .create(params)
    .then(user => {
      res.redirect(`/users/${user.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
