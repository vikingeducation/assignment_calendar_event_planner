var express = require("express");
var router = express.Router();
var models = require("./../models");
var User = models.User;
var Calendar = models.Calendar;
var Event = models.Event;
var sequelize = models.sequelize;

// ----------------------------------------
// Index
// ----------------------------------------

router.get("/events", (req, res) => {
  //Event Name>Date<Start Time<End Time</Calendar Name</Username</Email</UserId<CalendarId
  let eventsArr;
  Event.findAll({ order: '"name"' })
    .then(events => {
      eventsArr = events;
      let calendarsProm = [];
      eventsArr.forEach(event => {
        calendarsProm.push(Calendar.findById(event.calendarId));
      });
      return Promise.all(calendarsProm);
    })
    .then(calendars => {
      for (let i = 0; i < calendars.length; i++) {
        eventsArr[i].calendarId = calendars[i].id;
        eventsArr[i].calendarName = calendars[i].name;
        eventsArr[i].userId = calendars[i].userId;
      };
      let usersProm = [];
      eventsArr.forEach(event => {
        usersProm.push(User.findById(event.userId));
      });
      return Promise.all(usersProm);      
    })
    .then(users => {
      for (let i = 0; i < users.length; i++) {
        eventsArr[i].username = users[i].username;
        eventsArr[i].email = users[i].email;
      };
      res.render("events/index", { eventsArr });
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// New
// ----------------------------------------
router.get("/events/new", (req, res) => {
  res.render("events/new");
});


// ----------------------------------------
// Show
// ----------------------------------------
router.get("/events/:id", (req, res) => {
  Event.findById(req.params.id)
    .then(event => {
      if (event) {
        Calendar.findById(event.calendarId).then(calendar => {
          User.findById(calendar.userId).then(user => {
            res.render("events/show", { event, calendar, user });
          })
        });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});


module.exports = router;
