const express = require('express');
const router = express.Router();
const models = require('../models');
const User = models.User;
const sequelize = models.sequelize;

//index
let onIndex = function(req, res) {
  User.findAll()
    .then(users => {
      res.render('users/index', { users });
    })
    .catch((e) => res.status(500).send(e.stack));
};

router.get('/', onIndex);
router.get('/users', onIndex);

//new
router.get('/users/new', (req, res) => {
  res.render('users/new');
});

//show
router.get('/users/:id', (req, res) => {
  let userId = req.params.id;
  User.findByPk(userId)
    .then( user => {
      if (user) {
        res.render('users/show', { user });
      } else {
        res.send(404);
      }
    })
    .catch((e) => res.status(500).send(e.stack));
});

//create
router.post('/users', (req, res) => {
  let body = req.body;

  console.log(req.body, 'req.body')

  let userParams = {
    fname: body.firstname,
    lname: body.lastname,
    username: body.username,
    email: body.email
  };

  User.create(userParams)
    .then( user => {
      res.redirect(`/users/${user.id}`);
    })
    .catch((e) => res.status(500).send(e.stack));
});

//destroy
router.delete('/users/:id', (req, res) => {
  User.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = 'GET';
      res.redirect('/users');
    })
    .catch((e) => res.status(500).send(e.stack));
});

//edit
router.get('/users/:id/edit', (req, res) => {
  User.findByPk(req.params.id)
    .then( user => {
      if (user) {
        res.render('users/edit', { user });
      } else {
        res.send(404);
      }
    })
    .catch((e) => res.status(500).send(e.stack));
});

//update
router.put('/users/:id', (req, res) => {
  User.update({
    fname: req.body.firstname,
    lname: req.body.lastname,
    username: req.body.username,
    email: req.body.email
  }, {
    where: { id: req.params.id },
    limit: 1
  })
  .then( user => {
    req.method = 'GET';
    res.redirect(`/users/${req.params.id}`);
  })
  .catch((e) => res.status(500).send(e.stack));
});

module.exports = router;
