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
			// console.log("calendars:", JSON.stringify(calendars, null, 2));
		})
		.catch(e => res.status(500).send(e.stack));
});

//Show an event

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

//edit form show

router.get("/events/:id/edit", (req, res) => {
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
				res.render("events/edit", { _event });
				// console.log("_event:", JSON.stringify(_event, null, 2));
			} else {
				res.send(404);
			}
		})
		.catch(e => res.status(500).send(e.stack));
});

// create new event

router.post("/event", (req, res) => {
	var body = req.body;

	// console.log("req.body:", req.body);
	//search db.Calendar for calendar,
	//and get id to associate with event
	Calendar.findAll({
		where: { id: body.event.calendar }
	}).then(calendar => {
		if (calendar) {
			// console.log("CALENDAR", calendar);

			var eventParams = {
				name: body.event.name,
				description: body.event.description,
				date: body.event.date,
				start_time: body.event.start_time,
				end_time: body.event.end_time,
				calendar_id: body.event.calendar
			};

			console.log("eventParams", JSON.stringify(eventParams, null, 2));

			_Event
				.create(eventParams)
				.then(event => {
					req.method = "GET";
					res.redirect(`/events/${event.id}`);
				})
				.catch(e => res.status(500).send(e.stack));
		} else {
			res.status(404);
		}
	});
});

// exports
module.exports = router;
