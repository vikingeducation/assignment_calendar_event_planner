var express = require('express');
var router = express.Router();
var models = require('./../models');
var Calendar = models.Calendar;
var User = models.User;
var sequelize = models.sequelize;

// Refer: https://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/
// Relations
User.hasMany(Calendar, { foreignKey: 'userId' });
Calendar.belongsTo(User, { foreignKey: 'userId' });


// ----------------------------------------
// Index
// ----------------------------------------
router.get('/', (req, res) => {

  Calendar.findAll({ include: [{ model: User }] })
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
  var calendar;

  Calendar.findById(req.params.id, { include: [{ model: User }] })
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

  Calendar.update({
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
  Calendar.destroy({
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