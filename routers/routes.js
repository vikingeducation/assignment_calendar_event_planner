var express = require('express');
var router = express.Router();
var models = require('./../models');
var User = models.User;
var Calendar = models.Calendar;
var sequelize = models.sequelize;

var onIndex = (req, res) => {
  User.findAll()
    .then(users => {
      res.render('users/index', { users });
    })
    .catch(e => res.status(500).send(e.stack));
};
router.get('/', onIndex);
router.get('/users', onIndex);

router.get('/users/new', (req, res) => {
  res.render('users/new');
});

//CALENDAR

var onIndexCalendar = (req, res) => {
  Calendar.findAll()
    .then(calendars => {
      res.render('calendars/index', { calendars });
    })
    .catch(e => res.status(500).send(e.stack));
};
router.get('/calendars', onIndexCalendar);

router.get('/calendars/new', (req, res) => {
  res.render('calendars/new');
});

router.get('/calendars/:id', (req, res) => {
  Calendar.findById(req.params.id)
    .then(calendars => {
      if (calendars) {
        res.render('calendars/show', { calendars });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

/////////////////////////////
router.get('/users/:id/edit', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.render('users/edit', { user });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.render('users/show', { user });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

router.post('/users', (req, res) => {
  var body = req.body;

  var userParams = {
    fname: body.user.fname,
    lname: body.user.lname,
    username: body.user.username,
    email: body.user.email
  };

  User.create(userParams)
    .then(user => {
      res.redirect(`/users/${user.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

router.put('/users/:id', (req, res) => {
  var userParams = req.body.user;

  User.update(
    {
      fname: userParams.fname,
      lname: userParams.lname,
      username: userParams.username,
      email: userParams.email
    },
    {
      where: { id: req.params.id },
      limit: 1
    }
  )
    .then(() => {
      req.method = 'GET';
      res.redirect(`/users/${req.params.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

router.delete('/users/:id', (req, res) => {
  User.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = 'GET';
      res.redirect('/users');
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
