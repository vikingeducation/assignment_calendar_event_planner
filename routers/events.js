var express = require('express');
var router = express.Router();
var models = require('./../models');
var sequelize = models.sequelize;
var db = require('./../models/index');


// ----------------------------------------
// Index
// ----------------------------------------
router.get('/', (req, res) => {

  db.events.findAll({
		include: [{ model: db.calendars, include: [{ model: db.users }] }]
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
  db.calendars.findAll({})
  .then(calendars => {
    res.render('events/new', { calendars });
  });
});


// ----------------------------------------
// Edit
// ----------------------------------------
router.get('/:id/edit', (req, res) => {

  db.events.findById(req.params.id)
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
router.get('/:id', (req, res) => {

  db.events.findById(req.params.id, 
  	{
			include: [{ model: db.calendars, include: [{ model: db.users }] }]
		})
    .then(event => {
      if (event) {
        res.render('events/show', { event });
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
  var ev = req.body.event;

  var eventParams = {
    name: ev.name,
    description: ev.description,
    date: ev.date,
    startTime:ev.startTime,
    endTime: ev.endTime,
    calendarId: ev.calendar
  };

  db.events.create(eventParams)
    .then((event) => {
      res.redirect(`/events/${ event.id }`);
    })
    .catch((e) => res.status(500).send(e.stack));
});


// ----------------------------------------
// Update
// ----------------------------------------
router.put('/:id', (req, res) => {
  var eventParams = req.body.event;

  db.events.update({
    name: eventParams.name,
    description: eventParams.description,
    date: eventParams.date,
    startTime: eventParams.startTime,
    endTime: eventParams.endTime
  }, {
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = 'GET';
      res.redirect(`/events/${ req.params.id }`);
    })
    .catch((e) => res.status(500).send(e.stack));
});


// ----------------------------------------
// Destroy
// ----------------------------------------
router.delete('/:id', (req, res) => {
  db.events.destroy({
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