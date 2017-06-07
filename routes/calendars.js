// routers/users.js

var express = require('express');
var router = express.Router();
var models = require('./../models');
var calendars = models.calendar;
var user = models.user;
var sequelize = models.sequelize;

var onIndex = (req, res) => {
  sequelize.query(
      "SELECT name, username, email, calendars.id as id, users.id as user_id FROM users JOIN calendars ON users.id = calendars.user_id;", {
        type: sequelize.QueryTypes.SELECT
      })
    .then((calendars) => {
      res.render('calendars/index', {
        calendars
      });
    })
    .catch((e) => res.status(500)
      .send(e.stack));
};
router.get('/', onIndex);


router.get('/new', (req, res) => {
  user.findAll()
    .then((users) => {
      res.render('calendars/new', {
        users
      });
    })
    .catch((e) => res.status(500)
      .send(e.stack));

});

router.get('/:id', (req, res) => {

  var id = req.params.id;

  sequelize.query(
      `SELECT name, username, email, calendars.id as id, users.id as user_id FROM users JOIN calendars ON users.id = calendars.user_id WHERE calendars.id = ${id};`, {
        type: sequelize.QueryTypes.SELECT
      })
    .then((calendar) => {
      if (calendar) {
        res.render('calendars/show', {
          calendar: calendar[0]
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

  var calendarParams = {
    user_id: body.calendar.owner,
    name: body.calendar.name
  };

  calendars.create(calendarParams)
    .then((calendar) => {
      res.redirect(`/calendars/`);
    })
    .catch((e) => res.status(500)
      .send(e.stack));
});

router.delete('/:id', (req, res) => {
  calendars.destroy({
      where: {
        id: req.params.id
      },
      limit: 1
    })
    .then(() => {
      req.method = 'GET';
      res.redirect('/calendars/');
    })
    .catch((e) => res.status(500)
      .send(e.stack));
});

router.get('/:id/edit', (req, res) => {
  calendars.findById(req.params.id)
    .then((calendar) => {
      if (calendar) {
        res.render('calendars/edit', {
          calendar
        })
      } else {
        res.send(404);
      }
    })
    .catch((e) => res.status(500)
      .send(e.stack));
});

router.put('/:id', (req, res) => {
  var calendarParams = req.body.calendar;


  calendars.update({
      name: calendarParams.name
    }, {
      where: {
        id: req.params.id
      },
      limit: 1
    })
    .then(() => {
      req.method = 'GET';
      res.redirect(`/calendars/${req.params.id}`);
    })
    .catch((e) => res.status(500)
      .send(e.stack));
});

module.exports = router;
