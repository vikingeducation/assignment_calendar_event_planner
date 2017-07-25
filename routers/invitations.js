const express = require('express');
const router = express.Router();
const models = require('./../models');
const Invitation = models.Invitation;
const Event = models.Event;
const User = models.User;
const sequelize = models.sequelize;
const { attachInfoToInvitations } = require('./../services/invitation-helpers');

// ----------------------------------------
// Index
// ----------------------------------------
const getAllInvitations = (req, res) => {
  let allInvitations = Invitation.findAll();
  let allEvents = Event.findAll();
  let allUsers = User.findAll();

  Promise.all([allInvitations, allEvents, allUsers])
    .then(values => {
      let invitations = values[0];
      let events = values[1];
      let users = values[2];

      let invitationsWithInfo = attachInfoToInvitations(invitations, events, users);
      res.render('invitations/index', { invitations: invitationsWithInfo });
    })
    .catch(e => res.status(500).send(e.stack));
};

router.get('/', getAllInvitations);

// ----------------------------------------
// New
// ----------------------------------------
router.get('/new', (req, res) => {
  let allEvents = Event.findAll();
  let allUsers = User.findAll();

  Promise.all([allEvents, allUsers])
    .then(values => {
      res.render('invitations/new', {
        events: values[0],
        users: values[1]
      });
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Create
// ----------------------------------------
router.post('/', (req, res) => {
  let body = req.body;

  let invitationParams = {
    eventId: body.invitation.event,
    userId: body.invitation.user,
  };

  Invitation.create(invitationParams)
    .then(invitation => {
      res.redirect(`/invitations/`);
    })
    .catch((e) => res.status(500).send(e.stack));
});

// ----------------------------------------
// Destroy
// ----------------------------------------
router.delete('/:id', (req, res) => {
  Invitation.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = 'GET';
      res.redirect('/invitations');
    })
    .catch((e) => res.status(500).send(e.stack));
});

module.exports = router;