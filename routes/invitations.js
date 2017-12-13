const router = require('express').Router();
const models = require('../models/index');
const { Invitation, Event, User } = models;


router.get('/', (req, res) => {
  const p1 = Invitation.findAll();
  const p2 = Event.findAll();
  const p3 = User.findAll();
  const newInvitations = [];

  Promise.all([p1, p2, p3])
    .then(values => {
      const invitations = values[0];
      const events = values[1];
      const users = values[2];

      invitations.forEach(invite => {
        let inviteEventId = invite.eventId;
        let inviteUserId = invite.userId;

        let filteredEvent = events.filter(event => {
          return event.id === inviteEventId;
        })[0];

        let filteredUser = users.filter(user => {
          return user.id === inviteUserId;
        })[0];

        newInvitations.push({
          id: invite.id,
          eventName: filteredEvent.name,
          userName: filteredUser.username,
          userEmail: filteredUser.email,
          eventId: filteredEvent.id,
          userId: filteredUser.id
        });
      })

      res.render('invitations', {newInvitations});
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});

router.get('/new', (req, res) => {
  res.render('createInvitation');
});

router.post('/', (req, res) => {
  const { eventName, inviteeUserName } = req.body;

  const p1 = Event.find({
    where: {name: eventName}
  });

  const p2 = User.find({
    where: {username: inviteeUserName}
  });

  Promise.all([p1, p2])
    .then(values => {
      const event = values[0];
      const user = values[1];

      const eventId = event.id;
      const userId = user.id;

      Invitation.create({
        eventId: eventId,
        userId: userId
      }).then(() => res.redirect('/invitations'));
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});

router.delete('/:id', (req, res) => {
  const invitationId = req.params.id;

  Invitation.destroy({
    where: {id: invitationId},
    limit: 1
  })
    .then(() => {
      req.method = 'GET';
      res.redirect('/invitations');
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});



module.exports = router;
