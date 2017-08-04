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
  console.log(`${req.body}`);
  res.end("post request :(");
});

router.get("/users/:id/edit", (req, res) => {
  Users.findById(req.params.id).then(user => {
    res.render("user_edit", { user });
  });
});

// router.post("/users/:id/edit/put", (req, res) {
//
// })
//

router.put("/users/:id", (req, res) => {
  let userInfo = req.body.user;
  console.log(req.body);

  console.log(userInfo);

  // Users.update({
  //   firstName: userInfo.firstName,
  //   lastName: userInfo.lastName,
  //   username: userInfo.username,
  //   email: userInfo.email
  // }, {
  //     where: { id: req.params.id }
  // })
  // .then(()=> {
  //   req.method = "GET";
  //   res.redirect(`/users/${req.params.id}`);
  // })
  res.end("hello sir");
});

module.exports = router;
