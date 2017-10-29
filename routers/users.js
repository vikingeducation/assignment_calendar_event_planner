const express = require('express');
const router = express.Router();
const models = require('./../models');
const User = models.User;
const sequelize = models.sequelize;


// ----------------------------------------
// Index
// ----------------------------------------
const usersIndex = (req, res) => {
  User.findAll()
  .then(users => {
    res.render('users/index', { users });
  })
  .catch(e => res.status(500).send(e.stack));
};
router.get('/', usersIndex);
router.get('/users', usersIndex);


// ----------------------------------------
// New
// ----------------------------------------
router.get('/users/new', (req, res) => {
  res.render('partials/_userForm');
});


// ----------------------------------------
// Create
// ----------------------------------------
router.post('/users', (req, res) => {
  let userParams = getUserParams(req);

  User.create(userParams)
    .then(user => {
      res.redirect(`/users/${ user.id }`);
    })
    .catch(e => res.send(500).send(e.stack));
});


// ----------------------------------------
// Show
// ----------------------------------------
router.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.render('users/show', { user });
      } else {
        res.status(404).send('404 Not Found');
      }
    })
    .catch(e => res.status(500).send(e.stack));
});


// ----------------------------------------
// Edit
// ----------------------------------------
router.get('/users/:id/edit', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.render('partials/_userForm', { user });
      } else {
        res.status(404).send('404 Not Found');
      }
    })
    .catch(e => res.status(500).send(e.stack));
});


// ----------------------------------------
// Update
// ----------------------------------------
router.put('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        let userParams = getUserParams(req);
        User.update(userParams, {
          where: { id: user.id },
          limit: 1
        })
          .then(() => {
            res.redirect(`/users/${ req.params.id }`);
          })
          .catch(e => res.status(500).send(e.stack));
      } else {
        res.status(404).send('404 Not Found');
      }
    })
    .catch(e => res.status(500).send(e.stack));
});


// ----------------------------------------
// Delete
// ----------------------------------------
router.delete('/users/:id', (req, res) => {
  User.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      res.redirect('/users');
    })
    .catch(e => res.status(500).send(e.stack));
});


// ----------------------------------------
// Functions
// ----------------------------------------
const getUserParams = (req) => {
  let userBody = req.body.user;

  return {
    fname: userBody.fname,
    lname: userBody.lname,
    username: userBody.username,
    email: userBody.email
  };
};

module.exports = router;
