const router = require('express').Router();
const models = require('../models');
const { Event, Calendar, User } = models;
const combineTables = require('../helpers/combineTables');

router.get('/', (req, res) => {
  const p1 = Event.findAll();
  const p2 = Calendar.findAll();
  const p3 = User.findAll();

  Promise.all([p1, p2, p3])
    .then(values => {
      const events = values[0];
      const calendars = values[1];
      const users = values[2];

      const combinedEvents = combineTables(events, calendars, users);
      res.render('events/index', {combinedEvents});
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});

router.get('/new', (req, res) => {
  res.render('events/create');
});

router.get('/:id', (req, res) => {
  const eventId = req.params.id;

  Event.findById(eventId)
    .then(event => {
      const eventCalendarId = event.calendarId;

      Calendar.findById(eventCalendarId)
        .then(calendar => {
          const calendarUserId = calendar.userId;

          User.findById(calendarUserId).then(user => {
            res.render('events/show', {event, calendar, user});
          })
        })
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});

router.post('/', (req, res) => {
  const newEvent = req.body;
  const calendarName = newEvent.calendarName;

  Calendar.findOne({
    where: {name: calendarName}
  })
    .then(calendar => {
      delete newEvent.calendarName;
      newEvent.calendarId = calendar.id;

      Event.create(newEvent).then(event => res.redirect('/events'));
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});

router.get('/:id/edit', (req, res) => {
  const eventId = req.params.id;

  Event.findById(eventId)
    .then(event => {
      res.render('events/edit', {event});
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});

router.put('/:id', (req, res) => {
  const eventId = req.params.id;
  const updatedData = req.body;
  delete updatedData['_method'];

  Event.update(updatedData, {
    where: {id: eventId}
  })
    .then(() => {
      res.redirect(`/events/${eventId}`);
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});

router.delete('/:id', (req, res) => {
  const eventId = req.params.id;

  Event.destroy({
    where: {id: eventId},
    limit: 1
  })
  .then(() => {
    res.redirect('/events');
  })
  .catch(err => {
    res.status(500).send(err.stack);
  });
});



module.exports = router;
