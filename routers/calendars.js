const express = require("express");
const router = express.Router();
const models = require("./../models");
const User = models.User;
const Calendar = models.Calendar;
const sequelize = models.sequelize;

router.get("/", (req, res) => {
  Calendar.findAll({ include: User })
    .then(calendars => {
      res.render("calendars/index", {
        title: "Calendars",
        calendars: calendars
      });
    })
    .catch(e => res.status(500).send(e.stack));
});

router.post("/", (req, res) => {
  const body = req.body;

  const calendarParams = {
    name: body.calendar.name,
    userId: body.calendar.userId
  };

  Calendar.create(calendarParams)
    .then(calendar => {
      res.redirect(`/calendars/${calendar.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get("/new", (req, res) => {
  User.findAll().then(users => {
    console.log(users);
    res.render("calendars/new", {
      title: "New Calendar",
      users: users
    });
  });
});

router.get("/:id", (req, res) => {
  Calendar.findById(req.params.id, { include: User })
    .then(calendar => {
      if (calendar) {
        res.render("calendars/show", {
          title: `${calendar.name}`,
          calendar: calendar
        });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

router.delete("/:id", (req, res) => {
  Calendar.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      res.redirect("/calendars");
    })
    .catch(e => res.status(500).send(e.stack));
});

router.put("/:id", (req, res) => {
  const calendarParams = req.body.calendar;

  Calendar.update(
    {
      name: calendarParams.name
    },
    {
      where: { id: req.params.id },
      limit: 1
    }
  )
    .then(() => {
      req.method = "GET";
      res.redirect(`/calendars/${req.params.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get("/:id/edit", (req, res) => {
  Calendar.findById(req.params.id)
    .then(calendar => {
      if (calendar) {
        res.render("calendars/edit", {
          title: `Edit: ${calendar.name}`,
          calendar: calendar
        });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
