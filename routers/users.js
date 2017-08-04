var express = require("express");
var router = express.Router();
var models = require("./../models");
var User = models.User;
var Calendar = models.Calendar;
var Calevent = models.calEvent;
var sequelize = models.sequelize;

// ----------------------------------------
// Index
// ----------------------------------------
var onIndex = (req, res) => {
  User.findAll()
    .then(users => {
      res.render("users/index", { users });
    })
    .catch(e => res.status(500).send(e.stack));
};
var onCalendarIndex = (req, res) => {
  Calendar.findAll()
    .then(calendar => {
      res.render("calendar/index", { calendar });
    })
    .catch(e => res.status(500).send(e.stack));
};
//calendar
router.get("/", onIndex);
router.get("/users", onIndex);
//calendar
router.get("/calendar", onCalendarIndex);

// ----------------------------------------
// New
// ----------------------------------------
router.get("/users/new", (req, res) => {
  res.render("users/new");
});
//calendar
router.get("/calendar/new", (req, res) => {
  res.render("calendar/new");
});
router.get("/calendar/:id/event/new", (req, res) => {
  res.render("events/new", { calendar: req.params.id });
});
// ----------------------------------------
// Edit
// ----------------------------------------
router.get("/users/:id/edit", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.render("users/edit", { user });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});
//calendar
router.get("/calendar/:id/edit", (req, res) => {
  Calendar.findById(req.params.id)
    .then(calendar => {
      if (calendar) {
        res.render("calendar/edit", { calendar });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});
// ----------------------------------------
// Show
// ----------------------------------------
router.get("/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.render("users/show", { user });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get("/calendar/:id", (req, res) => {
  Calendar.findById(req.params.id)
    .then(calendar => {
      if (calendar) {
        res.render("calendar/show", { calendar });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get("/calendar/:id/events", (req, res) => {
  Calevent.findAll(
    {where: {
      calendarId: req.params.id  
    }}
  )
    .then(event => {
      if (event) {
        res.render("events/index", { event });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
})

router.get("/event/:id", (req, res) => {
  Calevent.findById(req.params.id)
    .then(calevent => {
      if (calevent) {
        res.render("events/show", { calevent });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});


// ----------------------------------------
// Create
// ----------------------------------------
router.post("/users", (req, res) => {
  var body = req.body;

  var userParams = {
    fname: body.user.fname,
    lname: body.user.lname,
    username: body.user.username,
    email: body.user.email
  };

  User.create(userParams)
    .then(user => {
      res.redirect(`/users/${user.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});
router.post("/calendar", (req, res) => {
  var body = req.body;

  var calendarParams = {
    name: body.calendar.name,
    userId: body.calendar.userId
  };

  Calendar.create(calendarParams)
    .then(calendar => {
      res.redirect(`/calendar/${calendar.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});
router.post("/calendar/:id/event", (req, res) => {
  var body = req.body;

  var eventParams = {
    name: body.event.name,
    description: body.event.description,
    date: body.event.date,
    start: body.event.start,
    end: body.event.end,
    calendarId: req.params.id
  };

  Calevent.create(eventParams)
    .then(event => {
      res.redirect(`/calendar/${req.params.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});
// ----------------------------------------
// Update
// ----------------------------------------
router.put("/users/:id", (req, res) => {
  var userParams = req.body.user;

  User.update(
    {
      fname: userParams.fname,
      lname: userParams.lname,
      username: userParams.username,
      email: userParams.email
    },
    {
      where: { id: req.params.id },
      limit: 1
    }
  )
    .then(() => {
      req.method = "GET";
      res.redirect(`/users/${req.params.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});
router.put("/calendar/:id", (req, res) => {
  var calendarParams = req.body.calendar;

  Calendar.update(
    {
      name: calendarParams.name,
      userId: calendarParams.userId
    },
    {
      where: { id: req.params.id },
      limit: 1
    }
  )
    .then(() => {
      req.method = "GET";
      res.redirect(`/calendar/${req.params.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});
// ----------------------------------------
// Destroy
// ----------------------------------------
router.delete("/users/:id", (req, res) => {
  User.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = "GET";
      res.redirect("/users");
    })
    .catch(e => res.status(500).send(e.stack));
});
router.delete("/calendar/:id", (req, res) => {
  Calendar.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = "GET";
      res.redirect("/calendar");
    })
    .catch(e => res.status(500).send(e.stack));
});
module.exports = router;
