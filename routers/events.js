var express = require("express");
var router = express.Router();
var models = require("./../models");
var Event = models.Event;
var Calendar = models.Calendar;

// ----------------------------------------
// Index
// ----------------------------------------
var onIndex = (req, res) => {
  var events;
  Event.findAll({ raw: true })
    .then(cals => {
      events = cals;
      var promiseArr = [];
      events.forEach(function(event) {
        promiseArr.push(Calendar.findById(event.calendarId, { raw: true }));
      });
      return Promise.all(promiseArr);
    })
    .then(calendars => {
      events.forEach(function(event) {
        calendars.forEach(function(calendar) {
          if (event.calendarId == calendar.id) {
            event.calendar = calendar;
          }
        });
      });
      res.render("events/index", { events });
    })
    .catch(e => res.status(500).send(e.stack));
};

//For every event we get back, add a promise to the array

//Promise.all will fire all requests in parallel, wait for them to complete, then
//get an array of results where first element is mapping to resolve of first promiseArr
//and on through the array

router.get("/", onIndex);

// ----------------------------------------
// New
// ----------------------------------------
router.get("/new", (req, res) => {
  res.render("events/new");
});

// ----------------------------------------
// Edit
// ----------------------------------------
router.get("/:id/edit", (req, res) => {
  event
    .findById(req.params.id)
    .then(event => {
      if (event) {
        res.render("events/edit", { event });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Show
// ----------------------------------------
router.get("/:id", (req, res) => {
  event
    .findById(req.params.id)
    .then(event => {
      if (event) {
        res.render("events/show", { event });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Create
// ----------------------------------------
router.post("/", (req, res) => {
  var body = req.body;

  var eventParams = {
    name: body.event.name,
    calendarId: body.event.calendarId
  };

  event
    .create(eventParams)
    .then(event => {
      res.redirect(`events/${event.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Update
// ----------------------------------------
router.put("/:id", (req, res) => {
  var eventParams = req.body.event;

  event
    .update(
      {
        name: eventParams.name,
        calendarId: eventParams.calendarId
      },
      {
        where: { id: req.params.id },
        limit: 1
      }
    )
    .then(() => {
      req.method = "GET";
      //console.log("inside event edit put block ", `${req.params.id}`);
      res.redirect(`/events/${req.params.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Destroy
// ----------------------------------------
router.delete("/:id", (req, res) => {
  event
    .destroy({
      where: { id: req.params.id },
      limit: 1
    })
    .then(() => {
      req.method = "GET";
      res.redirect("/events");
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
