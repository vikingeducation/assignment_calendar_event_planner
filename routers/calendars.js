const express = require('express');
const router = express.Router();
const models = require('./../models');
const Calendar = models.Calendar;
const User = models.User;
const sequelize = models.sequelize;
const { attachUserInfoToCalendars } = require('./../services/calendar-helpers');

// ----------------------------------------
// Index
// ----------------------------------------
const getAllCalendars = (req, res) => {
  let allCalendars = Calendar.findAll();
  let allUsers = User.findAll(); 

  Promise.all([allCalendars, allUsers])
    .then(values => {
      let calendars = values[0];
      let users = values[1];

      let calendarsWithUserInfo = attachUserInfoToCalendars(calendars, users);
      res.render('calendars/index', { calendars: calendarsWithUserInfo });
    })
    .catch(e => res.status(500).send(e.stack));
};

router.get('/', getAllCalendars);

// ----------------------------------------
// New
// ----------------------------------------
router.get('/new', (req, res) => {
  User.findAll()
    .then(users => {
      res.render('calendars/new', { users });
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Edit
// ----------------------------------------
router.get('/:id/edit', (req, res) => {
  Calendar.findById(req.params.id)
    .then(calendar => {
      if (calendar) {
        res.render('calendars/edit', { calendar })
      } else {
        res.send(404);
      }
    })
    .catch((e) => res.status(500).send(e.stack));
});

// ----------------------------------------
// Show
// ----------------------------------------
router.get('/:id', (req, res) => {
  let calendar;

  Calendar.findById(req.params.id)
    .then(result => {
      calendar = result;
      return User.findById(calendar.userId);
    })
    .then(user => {
      if (calendar && user) {
        res.render('calendars/show', { calendar, user });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Create
// ----------------------------------------
router.post('/', (req, res) => {
  let body = req.body;

  let calendarParams = {
    name: body.calendar.name,
    userId: body.calendar.owner,
  };

  // res.redirect('/calendars');
  Calendar.create(calendarParams)
    .then(calendar => {
      res.redirect(`/calendars/${ calendar.id }`);
    })
    .catch((e) => res.status(500).send(e.stack));
});

// ----------------------------------------
// Update
// ----------------------------------------
router.put('/:id', (req, res) => {
  var calendarParams = req.body.calendar;

  Calendar.update({
    name: calendarParams.name
  }, {
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = 'GET';
      res.redirect(`/calendars/${ req.params.id }`);
    })
    .catch((e) => res.status(500).send(e.stack));
});

// ----------------------------------------
// Destroy
// ----------------------------------------
router.delete('/:id', (req, res) => {
  Calendar.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = 'GET';
      res.redirect('/calendars');
    })
    .catch((e) => res.status(500).send(e.stack));
});



module.exports = router;