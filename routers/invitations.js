var express = require('express');
var router = express.Router();
var models = require('./../models');
var sequelize = models.sequelize;
var db = require('./../models/index');


// ----------------------------------------
// Index
// ----------------------------------------
router.get('/', (req, res) => {

  db.invitations.findAll({
		include: [{ model: db.events, include: [{ model: db.calendars, include: [{ model: db.users }] }] }]
		})
    .then(invitations => {
		res.render('invitations/index', { invitations });
    })
    .catch(e => res.status(500).send(e.stack));
});


// ----------------------------------------
// New
// ----------------------------------------
router.get('/new', (req, res) => {
  var events;

  db.events.findAll({})
    .then(results => {
      events = results;
    })
  
  db.users.findAll({})
    .then(users => {
      res.render('invitations/new', { events, users });
    });
});


// ----------------------------------------
// Create
// ----------------------------------------
router.post('/', (req, res) => {
  var invite = req.body.invitation;

  var invitationParams = {
    eventId: invite.id,
    userId: invite.user
  };

  db.invitations.create(invitationParams)
    .then((invitation) => {
      res.redirect(`/invitations`);
    })
    .catch((e) => res.status(500).send(e.stack));
});


module.exports = router;