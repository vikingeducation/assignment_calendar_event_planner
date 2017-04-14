var express = require('express');
var router = express.Router();
var models = require('./../models');
var Calendar = models.Calendar;
var User = models.User;

// ----------------------------------------
// Index
// ----------------------------------------
var onIndex = (req, res) => {
  var calendars;
  Calendar.findAll({ raw: true })
    .then(cals => {
      calendars = cals;
      var promiseArr = [];
      calendars.forEach(function(calendar) {
        promiseArr.push(User.findById(calendar.userId, { raw: true }));
      });
      return Promise.all(promiseArr);
    })
    .then(users => {
      calendars.forEach(function(calendar) {
        users.forEach(function(user) {
          if (calendar.userId == user.id) {
            calendar.user = user;
          }
        });
      });
      res.render('calendars/index', { calendars });
    })
    .catch(e => res.status(500).send(e.stack));
};

//For every calendar we get back, add a promise to the array

//Promise.all will fire all requests in parallel, wait for them to complete, then
//get an array of results where first element is mapping to resolve of first promiseArr
//and on through the array

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
router.post('/', (req, res) => {
  var body = req.body;

  var calendarParams = {
    name: body.calendar.name,
    userId: body.calendar.userId
  };

  Calendar.create(calendarParams)
    .then(calendar => {
      res.redirect(`calendars/${calendar.id}`);
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
      //console.log("inside calendar edit put block ", `${req.params.id}`);
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
