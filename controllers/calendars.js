const express = require('express');
const models = require('./../models');
const { amendCalendars } = require('./../helpers/calendars');

const router = express.Router();
const sequelize = models.sequelize;
const User = models.User;
const Calendar = models.Calendar;
const Event = models.Event;

// Index
const onIndex = (req, res) => {
  const p1 = Calendar.findAll();
  const p2 = User.findAll();

  Promise.all([p1, p2])
    .then(values => {
      let calendars = values[0];
      const users = values[1];
      const amendedCalendars = amendCalendars(calendars, users);

      res.render('calendars/index', { calendars: amendedCalendars });
    })
    .catch(e => res.status(500).send(e.stack));
};

router.get('/', onIndex);

// New
router.get('/new', (req, res) => {
  res.render('calendars/new');
});

// Edit
router.get('/:id/edit', (req, res) => {
  Calendar.findById(req.params.id)
    .then(calendar => {
      if (calendar) {
        res.render('calendars/edit', { calendar });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

// Show
router.get('/:id', (req, res) => {
  let calendar;
  let events;
  const p1 = Calendar.findById(req.params.id);
  const p2 = Event.findAll({
    where: { calendarId: req.params.id }
  });

  Promise.all([p1, p2])
    .then(values => {
      calendar = values[0];
      events = values[1];
      return User.findById(calendar.userId);
    })
    .then(user => {
      if (calendar && user) {
        res.render('calendars/show', { calendar, user, events });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

// Create
router.post('/', (req, res) => {
  const body = req.body;
  const userIdentifier = body.calendar.identifier;

  User.findAll({
    where: {
      $or: [{ username: userIdentifier }, { email: userIdentifier }]
    }
  })
    .then(result => {
      if (result) {
        const user = result[0];
        const calendarParams = {
          name: body.calendar.name,
          userId: user.id
        };
        return Calendar.create(calendarParams);
      } else {
        res.send(404);
      }
    })
    .then(calendar => {
      res.redirect(`/calendars/${calendar.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

// Update
router.put('/:id', (req, res) => {
  const calendarName = req.body.calendar.name;

  Calendar.update(
    {
      name: calendarName
    },
    {
      where: { id: req.params.id },
      limit: 1
    }
  )
    .then(() => {
      req.method = 'GET';
      res.redirect(`/calendars/${req.params.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

// Delete
router.delete('/:id', (req, res) => {
  Calendar.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = 'GET';
      res.redirect('/calendars');
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
