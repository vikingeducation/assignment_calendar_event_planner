const express = require('express');
const router = express.Router();
const db = require('./../models');
const sequelize = db.sequelize;

// ----------------------------------------
// Index
// ----------------------------------------
router.get('/', (req, res) => {
  db.events.findAll({
    include: [
      {
        model: db.calendars,
        as: 'calendar',
        include: [
          {
            model: db.users,
            as: 'user'
          }
        ]
      }
    ]
  })
    .then(events => {
      res.render('events/index', { events });
    })
    .catch(e => res.status(500).send(e.stack));
});


// ----------------------------------------
// New
// ----------------------------------------
router.get('/new', (req, res) => {
  res.render('partials/_eventForm');
});


// ----------------------------------------
// Create
// ----------------------------------------
router.post('/', (req, res) => {
  db.calendars.find({ where: { name: req.body.event.calendar } })
    .then(calendar => {
      if (calendar) {
        var attributes = getAllowedParams(req);
        attributes.calendarId = calendar.id;

        db.events.create(attributes)
          .then(event => {
            req.flash('success', `Event: ${ event.name } created successfully`);
            res.redirect(`/events/${ event.id }`);
          })
          .catch(e => {
            req.flash('error', e);
            res.render('partials/_eventForm');
          });
      } else {
        req.flash('error', "The calendar does not exist");
        res.render('partials/_eventForm');
      }
    })
    .catch(e => res.status(500).send(e.stack));
});


// ----------------------------------------
// Show
// ----------------------------------------
router.get('/:id', (req, res) => {
  db.events.find({
    where: { id: req.params.id },
    include: [
      {
        model: db.calendars,
        as: 'calendar',
        include: [
          {
            model: db.users,
            as: 'user'
          }
        ]
      }
    ]
  })
    .then(event => {
      if (event) {
        res.render('events/show', { event });
      } else {
        res.status(404).send('Event Not Found');
      }
    })
    .catch(e => res.status(500).send(e.stack));
});


// ----------------------------------------
// Functions
// ----------------------------------------
const getAllowedParams = req => {
  var params = req.body.event;

  return {
    name: params.name,
    date: params.date,
    start: params.start,
    end: params.end,
    description: params.description
  };
};

module.exports = router;
