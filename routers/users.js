const express = require("express");
const router = express.Router();
const models = require("./../models");
const User = models.User;
const Calendar = models.Calendar;
const CalendarEvent = models.CalendarEvent;
const sequelize = models.sequelize;

router.get("/", (req, res) => {
  User.findAll()
    .then(users => {
      res.render("users/index", { title: "Users", users: users });
    })
    .catch(e => res.status(500).send(e.stack));
});

router.post("/", (req, res) => {
  const body = req.body;

  const userParams = {
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

router.get("/new", (req, res) => {
  res.render("users/new", { title: "New User" });
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.render("users/show", {
          title: `${user.fname} ${user.lname}`,
          user: user
        });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

router.delete("/:id", (req, res) => {
  destroyEvents()
    .then(destroyCalenders)
    .then(destroyUser)
    .then(redirectHome)
    .catch(e => res.status(500).send(e.stack));

  function destroyUser() {
    return User.destroy({
      where: { id: req.params.id },
      limit: 1
    });
  }

  function destroyCalenders() {
    return Calendar.destroy({ where: { userId: req.params.id } });
  }

  function destroyEvents() {
    return Calendar.findAll({
      where: { userId: req.params.id }
    }).then(calendars => {
      return CalendarEvent.destroy({
        where: {
          calendarId: {
            $in: calendars.map(calendar => calendar.id)
          }
        }
      });
    });
  }

  function redirectHome() {
    res.redirect("/users");
  }
});

router.put("/:id", (req, res) => {
  const userParams = req.body.user;

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

router.get("/:id/edit", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.render("users/edit", {
          title: `Edit: ${user.fname} ${user.lname}`,
          user: user
        });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
