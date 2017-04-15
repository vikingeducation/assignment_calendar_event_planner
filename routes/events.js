var express = require('express');
var router = express.Router();
var models = require('../models');
var Event = models.Event;
var User = models.User;
var Calendar = models.Calendar;

router.get("/", (req, res) => {
  Event.findAll().then(events => {
    Calendar.findAll().then(calendars => {
      User.findAll().then(users => {
        let records = [];
        for( let i = 0; i < )
        calendars.forEach(calendar => {
          let currentUser = users.filter(user => {
            return calendar.userId === user.id;
          })[0];
        records.push({ calendar, user: currentUser });
      })
      
      });
      res.render("calendars/index", { records });
    });
  });
});