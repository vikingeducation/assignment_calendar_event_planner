var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;
var Calendar = models.Calendar;

router.get('/', (req, res) => {
  //findAll calendars
  
  Calendar.findAll().then(calendars => {
    User.findAll().then(users => {
      let records = [];
      calendars.forEach( (calendar) => {
        let currentUser = users.filter((user) => {
          return calendar.userId === user.id
        })[0];
        records.push({calendar, user: currentUser})
      })
      res.render('calendars/index', {records})
    })

    
  })

  //forEach calID grab user and push to array

  //promise.all array


  //res.render('calendars/index', { calendars });
});

module.exports = router;
