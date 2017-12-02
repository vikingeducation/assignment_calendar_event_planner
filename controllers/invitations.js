const express = require('express');
const models = require('./../models');
const { amendInvitations } = require('./../helpers/invitations');

const router = express.Router();
const sequelize = models.sequelize;
const User = models.User;
const Event = models.Event;
const Invitation = models.Invitation;

// Index
const onIndex = (req, res) => {
  const p1 = Invitation.findAll();
  const p2 = Event.findAll();
  const p3 = User.findAll();

  Promise.all([p1, p2, p3])
    .then(values => {
      const invitations = values[0];
      const events = values[1];
      const users = values[2];
      const amendedInvitations = amendInvitations(invitations, events, users);

      res.render('invitations/index', { invitations: amendedInvitations });
    })
    .catch(e => res.status(500).send(e.stack));
};

router.get('/', onIndex);

// New
router.get('/new', (req, res) => {
  res.render('invitations/new');
});

// Create
router.post('/', (req, res) => {
  const body = req.body;
  const eventName = body.invitation.event;
  const userIdentifier = body.invitation.identifier;

  const p1 = Event.findAll({
    where: { name: eventName }
  });

  const p2 = User.findAll({
    where: {
      $or: [{ username: userIdentifier }, { email: userIdentifier }]
    }
  });

  Promise.all([p1, p2])
    .then(values => {
      if (values) {
        const event = values[0][0];
        const user = values[1][0];
        const invitationParams = {
          eventId: event.id,
          userId: user.id
        };
        return Invitation.create(invitationParams);
      } else {
        res.send(404);
      }
    })
    .then(invitation => {
      res.redirect('/invitations');
    })
    .catch(e => res.status(500).send(e.stack));
});

// Delete
router.delete('/:id', (req, res) => {
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
