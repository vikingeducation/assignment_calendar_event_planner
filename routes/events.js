// routers/users.js

var express = require('express');
var router = express.Router();
var models = require('./../models');
var calendars = models.calendar;
var user = models.user;
var events = models.events;
var sequelize = models.sequelize;

var onIndex = (req, res) => {
  sequelize.query(
      "SELECT events.name, events.date, events.start_time, events.end_time, calendars.name as calendar_name, username, email, events.id as events_id, calendars.id as calendar_id, users.id as user_id FROM events JOIN calendars on events.calendar_id = calendars.id JOIN users ON users.id = calendars.user_id;", {
        type: sequelize.QueryTypes.SELECT
      })
    .then((events) => {
      res.render('events/index', {
        events
      });
    })
    .catch((e) => res.status(500)
      .send(e.stack));
};
router.get('/', onIndex);


router.get('/new', (req, res) => {
  calendars.findAll()
    .then((calendars) => {
      res.render('events/new', {
        calendars
      });
    })
    .catch((e) => res.status(500)
      .send(e.stack));

});

router.get('/:id', (req, res) => {

  var id = req.params.id;

  sequelize.query(
      `SELECT events.name, events.description, events.date, events.start_time, events.end_time, calendars.name as calendar_name, username, email, events.id as events_id, calendars.id as calendar_id, users.id as user_id FROM events JOIN calendars on events.calendar_id = calendars.id JOIN users ON users.id = calendars.user_id WHERE events.id = ${id};`, {
        type: sequelize.QueryTypes.SELECT
      })
    .then((my_event) => {
      if (my_event) {
        res.render('events/show', {
          event: my_event[0]
        });
      } else {
        res.send(404);
      }
    })
    .catch((e) => res.status(500)
      .send(e.stack));
});






router.post('/', (req, res) => {
  var body = req.body;

  var eventParams = {
    name: body.event.name,
    date: body.event.date,
    start_time: body.event.start_time,
    end_time: body.event.end_time,
    description: body.event.description,
    calendar_id: body.event.calendar
  };

  events.create(eventParams)
    .then((my_event) => {
      res.redirect(`/events/`);
    })
    .catch((e) => res.status(500)
      .send(e.stack));
});

router.delete('/:id', (req, res) => {
  events.destroy({
      where: {
        id: req.params.id
      },
      limit: 1
    })
    .then(() => {
      req.method = 'GET';
      res.redirect('/events/');
    })
    .catch((e) => res.status(500)
      .send(e.stack));
});

router.get('/:id/edit', (req, res) => {
  events.findById(req.params.id)
    .then((event) => {
      if (event) {
        res.render('events/edit', {
          event
        })
      } else {
        res.send(404);
      }
    })
    .catch((e) => res.status(500)
      .send(e.stack));
});

router.put('/:id', (req, res) => {
  var eventParams = req.body.event;


  events.update({
      name: eventParams.name,
      date: eventParams.date,
      start_time: eventParams.start_time,
      end_time: eventParams.end_time,
      description: eventParams.description,

    }, {
      where: {
        id: req.params.id
      },
      limit: 1
    })
    .then(() => {
      req.method = 'GET';
      res.redirect(`/events/${req.params.id}`);
    })
    .catch((e) => res.status(500)
      .send(e.stack));
});

module.exports = router;
