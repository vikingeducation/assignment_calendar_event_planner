var express = require("express");
var router = express.Router();
var models = require("./../models");
var User = models.User;
var Calendar = models.Calendar;
var sequelize = models.sequelize;

// ----------------------------------------
// Index
// ----------------------------------------

router.get("/calendars", (req, res) => {
  let cals;
  Calendar.findAll()
    .then(calendars => {
      cals = calendars;
      let usersProm = [];
      cals.forEach(calendar => {
        usersProm.push(User.findById(calendar.userID));
      });
      return Promise.all(usersProm);
    })
    .then(response => {
      console.log(response[0]);
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
