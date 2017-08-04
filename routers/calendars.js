var express = require("express");
var router = express.Router();
var models = require("./../models");
var calendars = models.calendars;
var sequelize = models.sequelize;

let grabCalendars = (req, res) => {
  calendars.findAll().then(calendar => {
    res.render("calendars/index", { calendar });
  });
};
//grab all the users info
router.get("/", grabCalendars);
//router.get("/calendars", grabCalendars);

//create new user
router.get("/calendars/new", (req, res) => {
  res.render("calendars/new");
});

router.get("/calendars/:id", (req, res) => {
  let id = req.params.id;
  calendars.findById(id).then(calendar => {
    res.render("calendars/show", { calendar });
  });
});

router.get("/calendars/:id/edit", (req, res) => {
  let id = req.params.id;
  calendars.findById(id).then(calendar => {
    res.render("calendars/edit", { calendar });
  });
  console.log("GOT A A GET /EDIT");
});

module.exports = router;
