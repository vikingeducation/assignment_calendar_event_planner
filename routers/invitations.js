const router = require("express").Router();
const models = require("../models");
const User = models.User;
const CalendarEvent = models.CalendarEvent;
const Invitation = models.Invitation;
const sequelize = models.sequelize;

router.get("/", (req, res) => {
  Invitation.findAll({ include: [{ all: true }] })
    .then(invitations => {
      res.render("invitations/index", {
        title: "Invitations",
        invitations: invitations
      });
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
