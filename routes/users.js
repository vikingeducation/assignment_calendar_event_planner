var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;
var sequelize = models.sequelize;

router.get('/', (req, res) => {
  User.findAll().then(users => {
    res.render('users/index', { users });
  });
});

router.get('/new', (req, res) => {
  res.render('users/new');
});

router.put('/:id', (req, res) => {
  let editedUser = {
    fname: req.body.user.fname,
    lname: req.body.user.lname,
    email: req.body.user.email,
    username: req.body.user.username
  };
  User.update(editedUser, {
    where: { id: req.params.id},
    limit: 1
  }).then(user => {
    req.method = 'GET';
    res.redirect(`/users/${user.id}`)
  }).catch(err => {
    res.status(500).send(err.stack);
  })
  
});

router.get('/:id/edit', (req, res) => {
  let userID = req.params.id;
  User.findById(userID).then(user => {
    if(user) {
      res.render('users/edit', { user });
    } else {
      res.send("404 File not found");
    }
  }).catch(err => {
    res.status(500).send(err.stack);
  })
})

router.post('/', (req, res) => {
  let newUser = {
    fname: req.body.user.fname,
    lname: req.body.user.lname,
    email: req.body.user.email,
    username: req.body.user.username
  };
  User.create(newUser).then(user => {
    res.redirect(`/users/${user.id}`)
  }).catch(err => {
    res.status(500).send(err.stack);
  })
});

router.get('/:id', (req, res) => {
  let userID = req.params.id;
  User.findById(userID).then(user => {
    if(user) {
      res.render('users/show', { user });
    } else {
      res.send("404 File not found");
    }
  }).catch(err => {
    res.status(500).send(err.stack);
  })
});

module.exports = router;
