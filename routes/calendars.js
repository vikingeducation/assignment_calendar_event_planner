var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;

router.get('/', (req, res) => {
  
  res.render('calendars/index', { calendars });
});

module.exports = router;
