var express = require("express");
var router = express.Router();
var models = require("./../models");
var UserTable = models.UserTables;
var CalendarTable = models.CalendarTables;
var EventTable = models.EventTables;
var Invitations = models.Invitation;
var sequelize = models.sequelize;
//––––––––––––––––––––––––––––––––––––
//–––––Users–––––
//––––––––––––––––––––––––––––––––––––
var onIndex = (req, res) => {
  UserTable.findAll()
    .then(users => {
      res.render("users/start", { users });
    })
    .catch(e => res.status(500).send(e.stack));
};

var onNewUser = (req, res) => {
  res.render("users/newUser");
};

var onPostNewUser = (req, res) => {
  var body = req.body.user;
  var createParams = {
    fname: body.fname,
    lname: body.lname,
    username: body.username,
    email: body.email
  };

  UserTable.create(createParams)
    .then(user => {
      res.redirect(`/user/${user.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
};

var oneUser = (req, res) => {
  UserTable.findById(req.params.id)
    .then(user => {
      if (user) {
        res.render("users/oneUser", { user });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
};

var editUser = (req, res) => {
  UserTable.findById(req.params.id)
    .then(user => {
      if (user) {
        res.render("users/edit", { user });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
};

var onUpdateUser = (req, res) => {
  var body = req.body.user;
  UserTable.update(
    {
      fname: body.fname,
      lname: body.lname,
      username: body.username,
      email: body.email
    },
    {
      where: { id: req.params.id },
      limit: 1
    }
  )
    .then(() => {
      req.method = "GET";
      res.redirect(`/user/${req.params.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
};

var onDeleteUser = (req, res) => {
  UserTable.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = "GET";
      res.redirect("/");
    })
    .catch(e => res.status(500).send(e.stack));
};

//––––––––––––––––––––––––––––––––––––
//–––––Calendars–––––
//––––––––––––––––––––––––––––––––––––

var onIndexCal = (req, res) => {
  CalendarTable.findAll({
    include: [UserTable]
  })
    .then(calendars => {
      res.render("calendars/start", { calendars });
    })
    .catch(e => res.status(500).send(e.stack));
};

var onCalendar = (req, res) => {
  CalendarTable.findAll({
    where: { id: req.params.id },
    include: [UserTable]
  })
    .then(calendar => {
      res.render("calendars/oneCal", { calendar });
    })
    .catch(e => res.status(500).send(e.stack));
};

var onNewCalendar = (req, res) => {
  UserTable.findAll()
    .then(users => {
      res.render("calendars/newCal", { users });
    })
    .catch(e => res.status(500).send(e.stack));
};

var onPostNewCalendar = (req, res) => {
  var body = req.body;
  var createParams = {
    name: body.name,
    userId: body.userSelect
  };
  CalendarTable.create(createParams)
    .then(calendar => {
      res.redirect(`/calendar/${calendar.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
};

var editCalendar = (req, res) => {
  CalendarTable.findById(req.params.id)
    .then(calendar => {
      if (calendar) {
        res.render("calendars/edit", { calendar });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
};

var onUpdateCalendar = (req, res) => {
  var body = req.body;
  CalendarTable.update(
    {
      name: body.name,
      userId: body.userId
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
};

var onDeleteCalendar = (req, res) => {
  CalendarTable.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = "GET";
      res.redirect("/calendar");
    })
    .catch(e => res.status(500).send(e.stack));
};

//––––––––––––––––––––––––––––––––––––
//–––––Events–––––
//––––––––––––––––––––––––––––––––––––

var onIndexEvent = (req, res) => {
  EventTable.findAll({
    include: [
      {
        model: CalendarTable,
        include: [UserTable]
      }
    ]
  })
    .then(events => {
      res.render("events/start", { events });
    })
    .catch(e => res.status(500).send(e.stack));
};

var onEvent = (req, res) => {
  EventTable.findAll({
    where: { id: req.params.id },
    include: [
      {
        model: CalendarTable,
        include: [UserTable]
      }
    ]
  })
    .then(events => {
      res.render("events/oneEvent", { events });
    })
    .catch(e => res.status(500).send(e.stack));
};

var onNewEvent = (req, res) => {
  CalendarTable.findAll()
    .then(calendars => {
      res.render("events/newEvent", { calendars });
    })
    .catch(e => res.status(500).send(e.stack));
};

var onPostNewEvent = (req, res) => {
  var body = req.body;
  var createParams = {
    name: body.name,
    description: body.description,
    date: body.date,
    startTime: body.startTime,
    endTime: body.endTime,
    calendarId: body.calendarId
  };
  EventTable.create(createParams)
    .then(event => {
      res.redirect(`/event/${event.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
};

var editEvent = (req, res) => {
  EventTable.findById(req.params.id)
    .then(event => {
      if (event) {
        res.render("events/edit", { event });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
};

var onUpdateEvent = (req, res) => {
  var body = req.body;
  EventTable.update(
    {
      name: body.name,
      description: body.description,
      date: body.date,
      startTime: body.startTime,
      endTime: body.endTime,
      calendarId: body.calendarId
    },
    {
      where: { id: req.params.id },
      limit: 1
    }
  )
    .then(() => {
      req.method = "GET";
      res.redirect(`/event/${req.params.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
};

var onDeleteEvent = (req, res) => {
  EventTable.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = "GET";
      res.redirect("/event");
    })
    .catch(e => res.status(500).send(e.stack));
};

//––––––––––––––––––––––––––––––––––––
//–––––Invitations–––––
//––––––––––––––––––––––––––––––––––––

var onIndexInvitation = (req, res) => {
  Invitations.findAll({
    include: [EventTable, UserTable]
  })
    .then(invitations => {
      res.render("invitations/start", { invitations });
    })
    .catch(e => res.status(500).send(e.stack));
};

var onNewInvitation = (req, res) => {
  Promise.all([EventTable.findAll(), UserTable.findAll()])
    .then(values => {
      var events = values[0];
      var users = values[1];
      res.render("invitations/newInvit", { users, events });
    })
    .catch(e => res.status(500).send(e.stack));
};

var onPostInvitation = (req, res) => {
  var body = req.body;
  var createParams = {
    eventId: body.eventId,
    userId: body.userId
  };
  Invitations.create(createParams)
    .then(invit => {
      res.redirect(`/invitations`);
    })
    .catch(e => res.status(500).send(e.stack));
};

var onDeleteInvitation = (req, res) => {
  Invitations.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = "GET";
      res.redirect("/invitations");
    })
    .catch(e => res.status(500).send(e.stack));
};

//––––––––––––––––––––––––––––––––––––
//–––––Router–––––
//––––––––––––––––––––––––––––––––––––

router.get("/", onIndex);
router.get("/user", onIndex);

router.get("/user/new", onNewUser);

router.post("/user/new", onPostNewUser);

router.get("/user/:id", oneUser);

router.get("/user/edit/:id", editUser);

router.put("/user/edit/:id", onUpdateUser);

router.delete("/user/delete/:id", onDeleteUser);

router.get("/calendar", onIndexCal);

router.get("/calendar/new", onNewCalendar);

router.post("/calendar/new", onPostNewCalendar);

router.get("/calendar/:id", onCalendar);

router.get("/calendar/edit/:id", editCalendar);

router.put("/calendar/edit/:id", onUpdateCalendar);

router.delete("/calendar/delete/:id", onDeleteCalendar);

router.get("/event", onIndexEvent);

router.get("/event/new", onNewEvent);

router.post("/event/new", onPostNewEvent);

router.get("/event/:id", onEvent);

router.get("/event/edit/:id", editEvent);

router.put("/event/edit/:id", onUpdateEvent);

router.delete("/event/delete/:id", onDeleteEvent);

router.get("/invitations", onIndexInvitation);

router.get("/invitations/new", onNewInvitation);

router.post("/invitations/new", onPostInvitation);

router.delete("/invitations/delete/:id", onDeleteInvitation);

module.exports = router;
