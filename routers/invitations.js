const router = require("express").Router();
const models = require("../models");
const User = models.User;
const CalendarEvent = models.CalendarEvent;
const Invitation = models.Invitation;
const sequelize = models.sequelize;

router.get("/", (req, res) => {
  Invitation.findAll({ attributes: ["id"], include: [{ all: true }] })
    .then(invitations => {
      res.render("invitations/index", {
        title: "Invitations",
        invitations: invitations
      });
    })
    .catch(e => res.status(500).send(e.stack));
});

router.post("/", (req, res) => {
  const body = req.body;

  const invitationParams = {
    eventId: body.invitation.eventId,
    userId: body.invitation.userId
  };

  Invitation.create(invitationParams)
    .then(invitation => {
      res.redirect(`/invitations`);
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get("/new", (req, res) => {
  let users;
  User.findAll()
    .then(result => {
      users = result;
      return CalendarEvent.findAll();
    })
    .then(events => {
      res.render("invitations/new", {
        title: "New Invitation",
        users: users,
        events: events
      });
    })
    .catch(e => res.status(500).send(e.stack));
});

router.delete("/:id", (req, res) => {
  Invitation.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => res.redirect("/invitations"))
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
