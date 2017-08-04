var express = require("express");
var router = express.Router();
var models = require("./../models");
var calendars = models.calendars;
var users = models.users;
var sequelize = models.sequelize;

let grabCalendars = (req, res) => {
  calendars.findAll().then(calendars => {
    res.render("calendars/index", { calendars });
  });
};

router.get("/", grabCalendars);

router.get("/new", (req, res) => {
  res.render("calendars/new");
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  calendars.findById(id).then(calendars => {
    console.log(calendars);
    users
      .findOne({
        where: { id: calendars.userid }
      })
      .then(user => {
        res.render("calendars/show", { calendar: calendars, user: user });
      });
  });
});

router.get("/calendars/:id/edit", (req, res) => {
  let id = req.params.id;
  calendars.findById(id).then(calendars => {
    res.render("calendars/edit", { calendars });
  });
});

router.post("/", (req, res) => {
  let params = {
    name: req.body.name.trim(),
    email: req.body.email.trim()
  };
  console.log(`params = ${params.email}`);
  users
    .findAll({
      where: { email: params.email }
    })
    .then(user => {
      //console.log(`USER IS ${user.getDataValue("id")}`);
      calendars
        .create({
          userid: user.id,
          name: params.name
        })
        .then(calendar => {
          res.redirect("/calendars");
        });
    });
});
//think about drying up with this
// let lookUpUser = (userId )=>{
//   .findAll({
//     where: { id: userId }
//   })
//   .then(user => {
//     return user
//   });
// }

module.exports = router;
