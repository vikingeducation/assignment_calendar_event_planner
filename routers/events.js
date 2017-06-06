const express = require('express');
const router = express.Router();
const models = require('./../models');
const Event = models.Event;
const Calendar = models.Calendar;
const User = models.User;
const sequelize = models.sequelize;
const { attachDetailsToEvents } = require('./../services/event-helpers');

// ----------------------------------------
// Index
// ----------------------------------------
const getAllEvents = (req, res) => {
  let allEvents = Event.findAll();
  let allCalendars = Calendar.findAll();
  let allUsers = User.findAll(); 

  Promise.all([allEvents, allCalendars, allUsers])
    .then(values => {
      let events = values[0];
      let calendars = values[1];
      let users = values[2];

      let eventsWithDetails = attachDetailsToEvents(events, calendars, users);
      res.render('events/index', { events: eventsWithDetails });
    })
    .catch(e => res.status(500).send(e.stack));
};

router.get('/', getAllEvents);

// ----------------------------------------
// New
// ----------------------------------------
router.get('/new', (req, res) => {
  Calendar.findAll()
    .then(calendars => {
      res.render('events/new', { calendars });
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Edit
// ----------------------------------------
router.get('/:id/edit', (req, res) => {
  Event.findById(req.params.id)
    .then(event => {
      if (event) {
        res.render('events/edit', { event })
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
  let thisEvent;
  let calendar;
  Event.findById(req.params.id)
    .then(result => {
      thisEvent = result;
      thisEvent.date = thisEvent.date.toString().slice(0, 15); // removes timestamp
      return Calendar.findById(thisEvent.calendarId);
    })
    .then(result => {
      calendar = result;
      return User.findById(calendar.userId);
    })
    .then(user => {
      if (thisEvent && calendar && user) {
        res.render('events/show', { event: thisEvent, calendar, user });
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

  let eventParams = {
    name: body.event.name,
    description: body.event.description,
    date: body.event.date,
    start: body.event.start,
    end: body.event.end,
    calendarId: body.event.calendar,
  };

  Event.create(eventParams)
    .then(event => {
      res.redirect(`/events/${ event.id }`);
    })
    .catch((e) => { 
      console.error(e.stack);
      Calendar.findAll()
        .then(calendars => {
          res.render('events/new', { calendars, warning: 1 });
        })
        .catch(e => res.status(500).send(e.stack));
    });
});

// ----------------------------------------
// Update
// ----------------------------------------
router.put('/:id', (req, res) => {
  var eventParams = req.body.event;

  Event.update({
    name: eventParams.name,
    description: eventParams.description,
    date: eventParams.date,
    start: eventParams.start,
    end: eventParams.end
  }, {
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = 'GET';
      res.redirect(`/events/${ req.params.id }`);
    })
    .catch((e) => {
      console.error(e.stack);
      Event.findById(req.params.id)
        .then(event => {
          if (event) {
            res.render('events/edit', { event, warning: 1 });
          } else {
            res.send(404);
          }
        });
    });
});

// ----------------------------------------
// Destroy
// ----------------------------------------
router.delete('/:id', (req, res) => {
  Event.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = 'GET';
      res.redirect('/events');
    })
    .catch((e) => res.status(500).send(e.stack));
});


module.exports = router;