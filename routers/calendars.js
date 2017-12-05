var express = require('express');
var router = express.Router();
var models = require('./../models');
var Calendars = models.Calendar;
var sequelize = models.sequelize;


var onIndex = (req, res) => {
  Calendars.findAll()
    .then((calendars) => {
      res.render('calendars/index', { calendars });
    })
    .catch((e) => res.status(500).send(e.stack));
};
router.get('/', onIndex);
router.get('/calendars', onIndex);
router.get('/calendars/new', (req, res) => {
  res.render('calendars/new');
});
router.delete('/calendars/:id', (req, res) => {
  Calendars.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = 'GET';
      res.redirect('/calendars');
    })
    .catch((e) => res.status(500).send(e.stack));
});
router.post('/calendars', (req, res) => {
  var body = req.body;

  var calendarParams = {
    name: body.calendar.name,
    username: body.calendar.username,
    email: body.calendar.email
  };

  Calendars.create(calendarParams)
    .then((calendar) => {
      res.redirect(`/calendars/${ calendar.id }`);
    })
    .catch((e) => res.status(500).send(e.stack));
});

router.get('/calendars/:id/edit', (req, res) => {
  Calendar.findById(req.params.id)
    .then((calendar) => {
      if (calendar) {
        res.render('calendars/edit', { calendar })
      } else {
        res.send(404);
      }
    })
    .catch((e) => res.status(500).send(e.stack));
});

router.put('/calendars/:id', (req, res) => {
  var calendarParams = req.body.calendar;

  Calendars.update({
    name: calendarParams.name,
    username: calendarParams.username,
    email: calendarParams.email
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
router.get('/calendars/:id', (req, res) => {
  Calendar.findById(req.params.id)
    .then((calendar) => {
      if (calendar) {
        res.render('calendars/show', { calendar });
      } else {
        res.send(404);
      }
    })
    .catch((e) => res.status(500).send(e.stack));
});

module.exports = router;
