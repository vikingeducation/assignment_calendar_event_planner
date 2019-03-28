const express = require('express');
const router = express.Router();

const models = require('../models');
const Calendar = models.Calendar;
const User = models.User;
const sequelize = models.sequelize;

//index
router.get('/', (req, res) => {

  var calendars = Calendar.findAll();
  var users = User.findAll()

  Promise.all([calendars, users])
    .then((results) => {
      var calendars = results[0],
          users = results[1];

          calendars.map(calendar => {
            users.forEach(user => {
              if (user.id == calendar.userId) {
                calendar.username = user.username;
                calendar.email = user.email;
              }
              return calendar;
            })
          });

        res.render('calendars/index', {calendars})
    })
    .catch( e => res.status(500).send(e.stack));
});

// new
router.get('/new', (req, res) => {
  User.findAll({
    attributes: [
      ['id', 'userId']
    ]
  })
    .then(userIds => {
      userIds = userIds.map(idObj => {
        return idObj.dataValues.userId
      });
      console.log(userIds, '****')
      res.render('calendars/new', { userIds });
    })
    .catch((e) => res.status(500).send(e.stack));
});




//show
router.get('/:id', (req, res) => {
  let calendarId = req.params.id;

  Calendar.findByPk(calendarId)
    .then(calendar => {
      if (calendar) {
        User.findByPk( calendar.userId ).then( user => {
          calendar.username = user.username;
          res.render('calendars/show', {calendar});
        })
      } else {
        res.send(400);
      }
    })
});


// Create
router.post('/', (req, res) => {
  req.body.name
  req.body.userId

  let calendarParams = {
    name: req.body.name,
    userId: req.body.userId
  };

  Calendar.create(calendarParams)
    .then( calendar => {
      res.redirect(`/calendars/${calendar.id}`)
    })
    .catch(e => res.status(500).send(e));

});

//edit
router.get('/:id/edit', (req, res) => {
  Calendar.findByPk(req.params.id)
    .then( calendar => {
      if (calendar) {
        res.render('calendars/edit', { calendar });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

// update
router.put('/:id', (req, res) => {
  let calendarParams = {
    name: req.body.name
  };

  Calendar.update(calendarParams, {
    where: { id: req.params.id },
    limit: 1
  })
    .then( calendar => {
      req.method = 'GET';
      res.redirect(`/calendars/${req.params.id}`);
    })
    .catch(e => res.status(500).send(e.stack));

});


//destroy
router.delete('/:id', (req, res) => {
  Calendar.destroy({
    where: { id : req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = 'GET';
      res.redirect('/calendars');
    })
    .catch((e) => res.status(500).send(e.stack));
})



module.exports = router;
