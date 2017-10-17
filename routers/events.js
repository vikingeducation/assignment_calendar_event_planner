var express = require('express');
var router = express.Router();
var models = require('./../models');
var Event = models.Event;
var Calendar = models.Calendar;
var User = models.User;
var sequelize = models.sequelize;

// ----------------------------------------
// Index
// ----------------------------------------
var onIndex = (req, res) => {
  Event.findAll()
    .then(events => {
      var calendarPromises = [];
      var userPromises = [];
      events.forEach(event => {
        calendarPromises.push(Calendar.findById(event.calendarId));
      });

      Promise.all(calendarPromises).then(calendars => {
        for (i = 0; i < events.length; i++) {
          events[i].calendarName = calendars[i].name;
          userPromises.push(User.findById(calendars[i].userId));
        }

        Promise.all(userPromises).then(users => {
          for (i = 0; i < events.length; i++) {
            events[i].username = users[i].username;
            events[i].email = users[i].email;
          }
          res.render('events/index', { events });
        });
      });
    })
    .catch(e => res.status(500).send(e.stack));
};
router.get('/events', onIndex);

// ----------------------------------------
// New
// ----------------------------------------
router.get('/events/new', (req, res) => {
  res.render('events/new');
});

// ----------------------------------------
// Edit
// ----------------------------------------
router.get('/events/:id/edit', (req, res) => {
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

// ----------------------------------------
// Show
// ----------------------------------------
router.get('/events/:id', (req, res) => {
  Event.findById(req.params.id)
    .then(event => {
      if (event) {
        Calendar.findById(event.calendarId).then(calendar => {
          if (calendar) {
            event.calendarName = calendar.name;
            User.findById(calendar.userId).then(user => {
              if (user) {
                event.username = user.username;
                event.email = user.email;
                res.render('events/show', { event });
              }
            });
          }
        });
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Create
// ----------------------------------------
router.post('/events', (req, res) => {
  var body = req.body;

  var eventParams = {
    name: body.event.name,
    date: body.event.date,
    start_time: body.event.start_time,
    end_time: body.event.end_time,
    calendarId: body.event.calendar,
    description: body.event.description
  };

  Event.create(eventParams)
    .then(event => {
      res.redirect(`/event/${event.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Update
// ----------------------------------------
router.put('/events/:id', (req, res) => {
  var eventParams = req.body.event;

  Event.update(
    {
      name: eventParams.name,
      date: eventParams.date,
      start_time: eventParams.start_time,
      end_time: eventParams.end_time,
      calendarId: eventParams.calendar,
      description: eventParams.description
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

// ----------------------------------------
// Destroy
// ----------------------------------------
router.delete('/events/:id', (req, res) => {
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
