const express = require("express");
const router = express.Router();
const { CalendarController } = require("../controllers");

router.get("/", CalendarController.showCalendars);

module.exports = router;
