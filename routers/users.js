const express = require('express');
const router = express.Router();
const models = require('../models');
const User = models.User;
const sequelize = models.sequelize;

let onIndex = function(req, res) {
  User.findAll()
    .then(users => {
      res.render('users/index', { users });
    })
    .catch((e) => res.status(500).send(e.stack));
};



router.get('/', onIndex);
router.get('/users', onIndex);

module.exports = router;
