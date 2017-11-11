var express = require('express');
var router = express.Router();
var models = require('./../models');
var sequelize = models.sequelize;
var db = require('./../models/index');

// ----------------------------------------
// Index
// ----------------------------------------
router.get('/', (req, res) => {

  db.calendars.findAll({ include: [{ model: db.users }] })
    .then(calendars => {


  // var calendars;

  // Calendar.findAll({})
  //   .then(results => {
  //     calendars = results;
  //     var usersArr = [];

  //     results.map(calendar => {
  //       usersArr.push(User.findById(calendar.userId));
  //     });
  //     return Promise.all(usersArr);
  //   })
  //   .then(users => {
  //     calendars.map(calendar => {
  //       users.map(user => {
  //         if (calendar.userId == user.id) {
  //           calendar.user = user;
  //         }
  //       });
  //     });

      res.render('calendars/index', { calendars });
    })
    .catch(e => res.status(500).send(e.stack));
});


// ----------------------------------------
// New
// ----------------------------------------
router.get('/new', (req, res) => {
  db.users.findAll({})
  .then(users => {
    res.render('calendars/new', { users });
  })
  
});


// ----------------------------------------
// Edit
// ----------------------------------------
router.get('/:id/edit', (req, res) => {

  db.calendars.findById(req.params.id)
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

  db.calendars.findById(req.params.id, { include: [{ model: db.users }] })
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
  var cal = req.body.calendar;

  var calendarParams = {
    name: cal.name,
    userId:cal.owner
  };

  db.calendars.create(calendarParams)
    .then((calendar) => {
      res.redirect(`/calendars/${ calendar.id }`);
    })
    .catch((e) => res.status(500).send(e.stack));
});


// ----------------------------------------
// Update
// ----------------------------------------
router.put('/:id', (req, res) => {
  var calendarParams = req.body.calendar;

  db.calendars.update({
    name: calendarParams.name,
    userId: calendarParams.userId
  }, {
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = 'GET';
      res.redirect(`/calendars/${ req.params.id }`);
    })
    .catch((e) => res.status(500).send(e.stack));
});


// ----------------------------------------
// Destroy
// ----------------------------------------
router.delete('/:id', (req, res) => {
  db.calendars.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = 'GET';
      res.redirect('/calendars');
    })
    .catch((e) => res.status(500).send(e.stack));
});

module.exports = router;