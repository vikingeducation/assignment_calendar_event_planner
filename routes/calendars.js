var express = require("express");
var router = express.Router();

//allow usage of database via sequelizer
var models = require("../models");
var Calendar = models.Calendar;
var sequelize = models.sequelize;

/* GET users listing. */
router.get("/", function(req, res, next) {
  Calendar.findAll({order: [["id", "ASC"]]}).then(calendars => {
    res.render("calendarindex", {calendars: calendars});
  });
});

module.exports = router;
