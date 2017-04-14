var express = require('express');
var router = express.Router();
var models = require('./../models');
var Calendar = models.Calendar;
var sequelize = models.sequelize;

// ----------------------------------------
// Index
// ----------------------------------------
var onIndex = (req, res) => {
  Calendar.findAll()
    .then(calendars => {
      res.render('calendars/index', { calendars });
    })
    .catch(e => res.status(500).send(e.stack));
};
//router.get('/', onIndex);
router.get('/', onIndex);

// ----------------------------------------
// New
// ----------------------------------------
router.get('/calendars/new', (req, res) => {
  res.render('calendars/new');
});

// ----------------------------------------
// Edit
// ----------------------------------------
router.get('/calendars/:id/edit', (req, res) => {
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
router.get('/calendars/:id', (req, res) => {
  Calendar.findById(req.params.id)
    .then(calendar => {
      if (calendar) {
        res.render('calendars/show', { calendar });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Create
// ----------------------------------------
router.post('/calendars', (req, res) => {
  var body = req.body;

  var calendarParams = {
    name: body.user.name,
    userId: body.user.userId
  };

  Calendar.create(calendarParams)
    .then(calendar => {
      res.redirect(`/calendars/${calendar.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Update
// ----------------------------------------
router.put('/calendars/:id', (req, res) => {
  var calendarParams = req.body.calendar;

  Calendar.update(
    {
      name: calendarParams.name,
      userId: calendarParams.userId
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
router.delete('/calendars/:id', (req, res) => {
  User.destroy({
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
