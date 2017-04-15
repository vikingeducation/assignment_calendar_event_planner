var express = require("express");
var router = express.Router();
var models = require("../models");
var User = models.User;
var Calendar = models.Calendar;


router.get("/", (req, res) => {
  Calendar.findAll().then(calendars => {
    User.findAll().then(users => {
      let records = [];
      calendars.forEach(calendar => {
        let currentUser = users.filter(user => {
          return calendar.userId === user.id;
        })[0];
        records.push({ calendar, user: currentUser });
      });
      res.render("calendars/index", { records });
    });
  });
});

router.post('/', (req, res) => {
  let calendarParams = {
    name: req.body.calendar.name,
    userId: req.body.calendar.userId
  };
  Calendar.create(calendarParams).then(calendar => {
    res.redirect(`/calendars/${calendar.id}`)
  }).catch(err => {
    res.status(500).send(err.stack);
  })
});

router.put('/:id', (req, res) => {
  let calendarParams = {
    name: req.body.calendar.name
  };
  Calendar.update(calendarParams, {
    where: { id: req.params.id },
    limit: 1
  }).then(calendar => {
    req.method = 'GET';
    res.redirect(`/calendars/${req.params.id}`);
  }).catch(err => {
    res.status(500).send(err.stack);
  });
});

router.delete('/:id', (req, res) => {
  Calendar.destroy({
    where: { id: req.params.id },
    limit: 1
  }).then( () => {
    req.method = 'GET';
    res.redirect('/calendars');
  }).catch(err => {
    res.status(500).send(err.stack);
  });
});

router.get('/new', (req, res) => {
  User.findAll().then(users => {
    res.render('calendars/new', { users });
  })
});

router.get('/:id', (req, res) => {
  Calendar.findById(req.params.id).then(calendar => {
    if(calendar) {
      User.findById(calendar.userId).then(user => {
        res.render('calendars/show', { calendar, user });
      });
    } else {
      res.send("404 File not found");
    }
  }).catch(err => {
    res.status(500).send(err.stack);
  })
});

router.get('/:id/edit', (req, res) => {
  Calendar.findById(req.params.id).then(calendar => {
    if(calendar) {
      res.render('calendars/edit', { calendar });
    } else {
      res.send("404 File not found");
    }
  }).catch(err => {
    res.status(500).send(err.stack);
  })
})

module.exports = router;
