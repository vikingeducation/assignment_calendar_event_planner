const router = require('express').Router();
const models = require('../models/index');
const User = models.User;


router.get('/', (req, res) => {
  User.findAll()
    .then(users => {
      res.render('users/index', {users});
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});


router.get('/users/new', (req, res) => {
  res.render('users/create');
});


router.get('/users/:id', (req, res) => {
  const userId = req.params.id;

  User.find({
    where: {id: userId}
  })
    .then(user => {
      res.render('users/show', {user});
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});


router.post('/users', (req, res) => {
  const newUser = req.body;

  User.create(newUser)
    .then(addedUser => {
      res.redirect(`/users/${addedUser.id}`)
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});


router.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  User.destroy({
    where: {id: userId},
    limit: 1
  })
    .then(() => {
      req.method = 'GET';
      res.redirect('/');
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});


router.get('/users/:id/edit', (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .then(user => {
      res.render('users/edit', {user});
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});


router.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  User.update(updateData, {
    where: {id: userId},
    limit: 1
  })
    .then(() => {
      req.method = 'GET';
      res.redirect(`/users/${userId}`);
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});



module.exports = router;
