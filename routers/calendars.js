const express = require('express');
const router = express.Router();

const models = require('../models');
const Calendar = models.Calendar;
const User = models.User;
const sequelize = models.sequelize;

router.get('/', (req, res) => {

  var calendars = Calendar.findAll();
  var users = User.findAll()

  Promise.all([calendars, users])
    .then((results) => {
      var calendars = results[0],
          users = results[1];

          calendars.map(calendar => {
            users.forEach(user => {
              if (user.id == calendar.userId) {
                calendar.username = user.username;
                calendar.email = user.email;
              }
              return calendar;
            })
          });

        res.render('calendars/index', {calendars})
    })
    .catch( e => res.status(500).send(e.stack));
});

router.get('/:id', (req, res) => {
  let calendarId = req.params.id;

  Calendar.findByPk(calendarId)
    .then(calendar => {
      if (calendar) {
        User.findByPk( calendar.userId ).then( user => {
          calendar.username = user.username;
          res.render('calendars/show', {calendar});
        })
      } else {
        res.send(400);
      }
    })
});



module.exports = router;
