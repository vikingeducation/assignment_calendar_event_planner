var express = require('express');
var router = express.Router();
var models = require('./../models');
var User = models.User;
var Calendar = models.Calendar;
var sequelize = models.sequelize;

// ----------------------------------------
// Index
// ----------------------------------------
var onIndex = (req, res) => {
  Calendar.findAll()
    .then(calendars => {
      var userPromises = [];
      calendars.forEach(calendar => {
        userPromises.push(User.findById(calendar.userId));
      });

      Promise.all(userPromises).then(users => {
        for (i = 0; i < calendars.length; i++) {
          calendars[i].username = users[i].username;
          calendars[i].email = users[i].email;
        }
        res.render('calendars/index', { calendars });
      });
    })
    .catch(e => res.status(500).send(e.stack));
};
router.get('/', onIndex);

// ----------------------------------------
// New
// ----------------------------------------
router.get('/new', (req, res) => {
  res.render('calendars/new');
});

// ----------------------------------------
// Edit
// ----------------------------------------
router.get('/:id/edit', (req, res) => {
  Calendar.findById(req.params.id)
    .then(calendar => {
      if (calendar) {
        res.render('calendars/edit', { calendar });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Show
// ----------------------------------------
router.get('/:id', (req, res) => {
  Calendar.findById(req.params.id)
    .then(calendar => {
      if (calendar) {
        User.findById(calendar.userId).then(user => {
          if (user) {
            calendar.username = user.username;
            calendar.email = user.email;
            res.render('calendars/show', { calendar });
          } else {
            res.send(404);
          }
        });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Create
// ----------------------------------------
router.post('/', (req, res) => {
  var body = req.body;

  User.findAll({
    where: { username: body.calendar.username }
  })
    .then(user => {
      if (user) {
        // console.log(user[0].dataValues);
        var calendarParams = {
          name: body.calendar.name,
          userId: user[0].dataValues.id
        };
        console.log(calendarParams);

        Calendar.create(calendarParams).then(calendar => {
          res.redirect(`/calendars/${calendar.id}`);
        });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Update
// ----------------------------------------
router.put('/:id', (req, res) => {
  var calendarParams = req.body.calendar;

  Calendar.update(
    {
      name: calendarParams.name
    },
    {
      where: { id: req.params.id },
      limit: 1
    }
  )
    .then(() => {
      req.method = 'GET';
      res.redirect(`/calendars/${req.params.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Destroy
// ----------------------------------------
router.delete('/:id', (req, res) => {
  Calendar.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = 'GET';
      res.redirect('/calendars');
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
