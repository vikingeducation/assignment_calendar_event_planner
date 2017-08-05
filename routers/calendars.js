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
  calendars.findById(id).then(calendar => {
    console.log(calendar);
    users
      .findOne({
        where: { id: calendar.userid }
      })
      .then(user => {
        res.render("calendars/show", { calendar: calendar, user: user });
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
  let hope = params.email;
  users
    .findAll({
      where: { email: hope }
    })
    .then(user => {
      //console.log(`USER IS ${user.getDataValue("id")}`);
      calendars
        .create({
          name: params.name,
          userid: user.id
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
