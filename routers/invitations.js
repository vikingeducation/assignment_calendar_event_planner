var express = require('express');
var router = express.Router();
var models = require('./../models');
var Invitation = models.Invitation;
var Event = models.Event;
var Calendar = models.Calendar;
var User = models.User;
var sequelize = models.sequelize;

// ----------------------------------------
// Index
// ----------------------------------------
var onIndex = (req, res) => {
  Invitation.findAll()
    .then(invitations => {
      var eventPromises = [];
      var userPromises = [];
      invitations.forEach(invitation => {
        eventPromises.push(Event.findById(invitation.eventId));
      });

      Promise.all(eventPromises).then(events => {
        for (i = 0; i < invitations.length; i++) {
          invitations[i].eventName = events[i].name;
          userPromises.push(User.findById(invitations[i].userId));
        }

        Promise.all(userPromises).then(users => {
          for (i = 0; i < invitations.length; i++) {
            invitations[i].username = users[i].username;
            invitations[i].email = users[i].email;
          }
          res.render('invitations/index', { invitations });
        });
      });
    })
    .catch(e => res.status(500).send(e.stack));
};
router.get('/invitations', onIndex);

// ----------------------------------------
// New
// ----------------------------------------
router.get('/invitations/new', (req, res) => {
  res.render('invitations/new');
});

// ----------------------------------------
// Create
// ----------------------------------------
router.post('/invitations', (req, res) => {
  var body = req.body;

  var invitationParams = {
    eventId: body.invitation.event,
    userId: body.invitation.username
  };

  Invitation.create(invitationParams)
    .then(invitation => {
      res.redirect('/invitations');
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Destroy
// ----------------------------------------
router.delete('/invitations/:id', (req, res) => {
  Invitation.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = 'GET';
      res.redirect('/invitations');
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
