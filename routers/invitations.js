const express = require('express');
const router = express.Router();
const db = require('./../models');
const sequelize = db.sequelize;


// ----------------------------------------
// New
// ----------------------------------------
router.get('/new/:eventId', (req, res) => {
  db.events.findById(req.params.eventId)
    .then(event => {
      if (event) {
        res.render('invitations/new', { event });
      } else {
        res.status(404).send('404 Event Not Found');
      }
    })
    .catch(e => res.status(500).send(e.stack));
});


// ----------------------------------------
// Create
// ----------------------------------------
router.post('/', (req, res) => {
  let params = req.body.invitation;
  db.users.find({
    where: {
      $or: [
        { username: params.invitee },
        { email: params.invitee }
      ]
    }
  })
    .then(user => {
      if (user) {
        db.invitations.create({
          eventId: params.eventId,
          userId: user.id
        })
          .then(() => {
            req.flash('success', 'Invitation created successfully');
            res.redirect(`/events/${ params.eventId }`);
          })
          .catch(e => {
            req.flash('error', e);
            res.redirect(`/invitations/new/${ params.eventId }`);
          });
      } else {
        req.flash('error', 'User not found');
        res.redirect(`/invitations/new/${ params.eventId }`);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});


// ----------------------------------------
// Destroy
// ----------------------------------------
router.delete('/:id', (req, res) => {
  db.invitations.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.flash('success', 'Invitation deleted successfully');
      res.redirect('back');
    })
    .catch(e => res.status(500).send(e.stack));
});


module.exports = router;
