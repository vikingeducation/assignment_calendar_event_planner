const router = require('express').Router();
const models = require('../models/index');
const { Calendar, User } = models;
const joinTables = require('../helpers/joinTables');

router.get('/', (req, res) => {
  const p1 = Calendar.findAll();
  const p2 = User.findAll();

  Promise.all([p1, p2])
    .then(values => {
      const calendars = values[0];
      const users = values[1];

      const calendarsWithUsers = joinTables(calendars, users);
      res.render('calendars', {calendarsWithUsers});
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});

router.get('/new', (req, res) => {
  res.render('createCalendar');
});

router.get('/:id', (req, res) => {
  const calendarId = req.params.id;
  let calendar;

  Calendar.findById(calendarId)
    .then(cal => {
      calendar = cal;
      return calendar.userId
    })
    .then(userId => {
      User.findById(userId).then(user => {
        res.render('calendar', {calendar, user})
      });
    });
});

router.post('/', (req, res) => {
  const { calendarName, username } = req.body;

  User.find({
    where: {username: username}
  })
    .then(user => {
        Calendar.create({
          name: calendarName,
          userId: user.id
        }).then(calendar => {
          res.redirect(`/calendars/${calendar.id}`);
        });
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});

router.get('/:id/edit', (req, res) => {
  const calendarId = req.params.id;

  Calendar.findById(calendarId)
    .then(calendar => {
      res.render('editCalendar', {calendar});
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});

router.put('/:id', (req, res) => {
  const calendarId = req.params.id;
  const { calendarName } = req.body;

  Calendar.update({
    name: calendarName
  }, {
    where: {id: calendarId},
    limit: 1
  })
  .then(() => {
    req.method = 'GET';
    res.redirect(`/calendars/${calendarId}`);
  })
  .catch(err => {
    res.status(500).send(err.stack);
  });
});

router.delete('/:id', (req, res) => {
  const calendarId = req.params.id;

  Calendar.destroy({
    where: {id: calendarId},
    limit: 1
  })
    .then(() => {
      req.method = 'GET';
      res.redirect('/calendars');
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});



module.exports = router;
