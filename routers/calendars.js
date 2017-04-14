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
        usersProm.push(User.findById(calendar.userId));
      });
      return Promise.all(usersProm);
    })
    .then(users => {
      let calsInfo = [];
      for (let i = 0; i < cals.length; i++) {
        calsInfo[i] = {
          name: cals[i].name,
          calendarId: cals[i].id,
          userId: users[i].id,
          username: users[i].username,
          email: users[i].email
        };
      }
      res.render("calendars/index", { calsInfo });
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// New
// ----------------------------------------
router.get("/calendars/new", (req, res) => {
  res.render("calendars/new");
});

// ----------------------------------------
// Show
// ----------------------------------------
router.get("/calendars/:id", (req, res) => {
  Calendar.findById(req.params.id)
    .then(calendar => {
      if (calendar) {
        User.findById(calendar.userId).then(user => {
          res.render("calendars/show", { calendar, user });
        });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Create
// ----------------------------------------
router.post("/calendars", (req, res) => {
  var body = req.body;
  var name = body.calendar.name;
  var username = body.user.username;

  var calParams = {
    name: body.calendar.name
  };
  User.findAll({
    where: { username }
  }).then(user => {
    calParams.userId = user.id;
    Calendar.create(calParams)
      .then(calendar => {
        res.redirect(`/calendars/${calendar.id}`);
      })
      .catch(e => res.status(500).send(e.stack));
  });
});

module.exports = router;
