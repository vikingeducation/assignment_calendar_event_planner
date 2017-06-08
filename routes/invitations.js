// routers/users.js

var express = require('express');
var router = express.Router();
var models = require('./../models');
var calendars = models.calendar;
var users = models.user;
var events = models.events;
var invitations = models.invitations;
var sequelize = models.sequelize;

var onIndex = (req, res) => {
  sequelize.query(
      "SELECT events.name, username, email, invitations.id as invitations_id, events.id as events_id, users.id as user_id FROM invitations JOIN events on events.id = invitations.event_id JOIN users ON users.id = invitations.user_id ORDER BY events.name, username;", {
        type: sequelize.QueryTypes.SELECT
      })
    .then((invitations) => {
      res.render('invitations/index', {
        invitations
      });
    })
    .catch((e) => res.status(500)
      .send(e.stack));
};
router.get('/', onIndex);

// need to grab both events list and username list
router.get('/new', (req, res) => {
  events.findAll()
    .then((events) => {
      users.findAll()
        .then((users) => {
          res.render('invitations/new', {
            events: events,
            users: users
          });
        });

    })
    .catch((e) => res.status(500)
      .send(e.stack));

});

router.post('/', (req, res) => {
  var body = req.body;

  var params = {
    event_id: parseInt(body.event_id),
    user_id: parseInt(body.user_id)
  };

  invitations.create(params)
    .then((my_event) => {
      res.redirect(`/invitations/`);
    })
    .catch((e) => res.status(500)
      .send(e.stack));
});

router.delete('/:id', (req, res) => {
  invitations.destroy({
      where: {
        id: req.params.id
      },
      limit: 1
    })
    .then(() => {
      req.method = 'GET';
      res.redirect('/invitations/');
    })
    .catch((e) => res.status(500)
      .send(e.stack));
});





module.exports = router;
