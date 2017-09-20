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
      }
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
      }
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
// Edit
// ----------------------------------------
router.get("/events/:id/edit", (req, res) => {
  Event.findById(req.params.id)
    .then(event => {
      if (event) {
        res.render("events/edit", { event });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
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
          });
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
router.post("/events", (req, res) => {
  var body = req.body;
  var calendarName = body.event.calendarName;
  var eventParams = {
    name: body.event.name,
    date: body.event.date,
    startTime: body.event.startTime,
    endTime: body.event.endTime,
    description: body.event.description
  };

  Calendar.find({
    where: { name: calendarName }
  }).then(calendar => {
    eventParams.calendarId = calendar.id;
    Event.create(eventParams)
      .then(event => {
        res.redirect(`/events/${event.id}`);
      })
      .catch(e => res.status(500).send(e.stack));
  });
});

// ----------------------------------------
// Update
// ----------------------------------------
router.put("/events/:id", (req, res) => {
  var eventParams = req.body.event;

  Event.update(
    {
      name: eventParams.name,
      date: eventParams.date,
      startTime: eventParams.startTime,
      endTime: eventParams.endTime,
      description: eventParams.description
    },
    {
      where: { id: req.params.id },
      limit: 1
    }
  )
    .then(() => {
      req.method = "GET";
      res.redirect(`/events/${req.params.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Destroy
// ----------------------------------------
router.delete("/events/:id", (req, res) => {
  Event.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = "GET";
      res.redirect("/events");
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
