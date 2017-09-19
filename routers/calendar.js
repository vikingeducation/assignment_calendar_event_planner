const express = require("express");
const router = express.Router();
let db = require("../models");
let Calendar = db.Calendar;

router.get("/calendars", (req, res) => {
  Calendar.findAll()
    .then(Calendar => {
      res.render("calendars", { calendars: Calendar });
    })
    .catch(err => {
      res.send(err);
    });
});

// router.post("/calendar/create", (req, res) => {
//   let userInfo = req.body.user;
//   Calendar.create({
//     firstName: userInfo.firstName,
//     lastName: userInfo.lastName,
//     username: userInfo.username,
//     email: userInfo.email
//   }).then(user => {
//     res.redirect(`/calendars/${user.id}`);
//   });
// });
//
// router.get("/calendars/create", (req, res) => {
//   res.render("user_new");
// });
//
// router.get("/calendars/:id/edit", (req, res) => {
//   Calendar.findById(req.params.id).then(user => {
//     res.render("user_edit", { user });
//   });
// });
//
// router.get("/calendars/:id", (req, res) => {
//   Calendar.findById(req.params.id).then(user => {
//     res.render("user_show", { user });
//   });
// });
//
// router.put("/calendars/:id", (req, res) => {
//   let userInfo = req.body.user;
//   Calendar.update(
//     {
//       firstName: userInfo.firstName,
//       lastName: userInfo.lastName,
//       username: userInfo.username,
//       email: userInfo.email
//     },
//     {
//       where: { id: req.params.id }
//     }
//   ).then(() => {
//     req.method = "GET";
//     res.redirect(`/calendars/${req.params.id}`);
//   });
// });
//
// router.delete("/calendars/:id", (req, res) => {
//   Calendar.destroy({ where: { id: req.params.id } }).then(() => {
//     req.method = "GET";
//     res.redirect("/");
//   });
// });

module.exports = router;
