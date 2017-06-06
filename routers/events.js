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
  
  // allEvents.then(events => {
  //   res.render('events/index', { events });
  // });

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


module.exports = router;