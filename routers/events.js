var express = require("express");
var router = express.Router();
var models = require("./../models");
var sequelize = models.sequelize;
var Calendar = models.Calendars;
var _Event = models.Events;
var User = models.Users;

//define associations
Calendar.hasMany(_Event, { foreignKey: "calender_id" });
_Event.belongsTo(Calendar, { foreignKey: "calender_id" });
User.hasMany(Calendar, { foreignKey: "userId" });
Calendar.belongsTo(User, { foreignKey: "userId" });

var onIndex = (req, res) => {
	_Event
		.findAll({
			include: [
				{
					model: Calendar,
					include: [
						{
							model: User
						}
					]
				}
			]
		}) // bracket disaster
		.then(_events => {
			res.render("events/index", { _events });
			// console.log("EVENTS:", JSON.stringify(_events, null, 2));
		})
		.catch(e => res.status(500).send(e.stack));
};

//Get Event index

router.get("/events", onIndex);

//get new event form

router.get("/events/new", (req, res) => {
	//find the calendars to display in a select box
	Calendar.findAll()
		.then(calendars => {
			res.render("events/new", { calendars });
			console.log("calendars:", JSON.stringify(calendars, null, 2));
		})
		.catch(e => res.status(500).send(e.stack));
});

//Show a calendar

router.get("/events/:id", (req, res) => {
	_Event
		.findById(req.params.id, {
			include: [
				{
					model: Calendar,
					include: [
						{
							model: User
						}
					]
				}
			]
		})
		.then(_event => {
			if (_event) {
				// console.log("_event:", JSON.stringify(_event, null, 2));
				res.render("events/show", { _event });
			} else {
				res.send(404);
			}
		})
		.catch(e => res.status(500).send(e.stack));
});

// exports
module.exports = router;
