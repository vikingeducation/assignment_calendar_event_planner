const express = require('express');
const models = require('./../models');
const { amendEvents } = require('./../helpers/events');

const router = express.Router();
const sequelize = models.sequelize;
const User = models.User;
const Calendar = models.Calendar;
const Event = models.Event;

// Index
const onIndex = (req, res) => {
  const p1 = Event.findAll();
  const p2 = Calendar.findAll();
  const p3 = User.findAll();

  Promise.all([p1, p2, p3])
    .then(values => {
      let events = values[0];
      const calendars = values[1];
      const users = values[2];
      const amendedEvents = amendEvents(events, calendars, users);

      res.render('events/index', { events: amendedEvents });
    })
    .catch(e => res.status(500).send(e.stack));
};

router.get('/', onIndex);

// New
router.get('/new', (req, res) => {
  res.render('events/new');
});

// Edit
router.get('/:id/edit', (req, res) => {
  Event.findById(req.params.id)
    .then(event => {
      if (event) {
        res.render('events/edit', { event });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

// Show
router.get('/:id', (req, res) => {
  let event;
  let calendar;

  Event.findById(req.params.id)
    .then(e => {
      event = e;
      return Calendar.findById(event.calendarId);
    })
    .then(c => {
      calendar = c;
      return User.findById(calendar.userId);
    })
    .then(user => {
      if (event && calendar && user) {
        res.render('events/show', { event, calendar, user });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

// Create
router.post('/', (req, res) => {
  const body = req.body;
  const calendarName = body.event.calendar;

  Calendar.findAll({
    where: { name: calendarName }
  })
    .then(result => {
      if (result) {
        const calendar = result[0];
        const eventParams = {
          name: body.event.name,
          description: body.event.description,
          date: body.event.date,
          start: body.event.start,
          end: body.event.end,
          calendarId: calendar.id
        };
        console.log(eventParams);
        return Event.create(eventParams);
      } else {
        res.send(404);
      }
    })
    .then(event => {
      res.redirect(`/events/${event.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

// Update
router.put('/:id', (req, res) => {
  const eventParams = req.body.event;

  Event.update(
    {
      name: eventParams.name,
      description: eventParams.description,
      date: eventParams.date,
      start: eventParams.start,
      end: eventParams.end
    },
    {
      where: { id: req.params.id },
      limit: 1
    }
  )
    .then(() => {
      req.method = 'GET';
      res.redirect(`/events/${req.params.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

// Delete
router.delete('/:id', (req, res) => {
  Event.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = 'GET';
      res.redirect('/events');
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
