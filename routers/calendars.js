var express = require("express");
var router = express.Router();
var models = require("./../models");
var Calendar = models.Calendar;
var sequelize = models.sequelize;
var User = models.Users;

//define associations
User.hasMany(Calendar, { foreignKey: "userId" });
Calendar.belongsTo(User, { foreignKey: "userId" });

// instead of making multiple querie I joined them
// users and calendars in one query
// https://stackoverflow.com/questions/20460270/how-to-make-join-querys-using-sequelize-in-nodejs
// https://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/
var onIndex = (req, res) => {
	Calendar.findAll({
		include: [
			{
				model: User
			}
		]
	})
		.then(calendars => {
			res.render("calendars/index", { calendars });
			// console.log("CALENDERS:", JSON.stringify(calendars, null, 2));
		})
		.catch(e => res.status(500).send(e.stack));
};

//Get Calendar index
router.get("/calendars", onIndex);

//get new calendar form
router.get("/calendars/new", (req, res) => {
	res.render("calendars/new");
});

//Show a calendar
router.get("/calendars/:id", (req, res) => {
	Calendar.findById(req.params.id, {
		include: [
			{
				model: User
			}
		]
	})
		.then(calendar => {
			if (calendar) {
				console.log("CALENDER:", JSON.stringify(calendar, null, 2));
				res.render("calendars/show", { calendar });
			} else {
				res.send(404);
			}
		})
		.catch(e => res.status(500).send(e.stack));
});

// create new calendar
router.post("/calendars", (req, res) => {
	var body = req.body;

	//search db.User for username,
	//and get id to associate with calendar
	User.findAll({
		where: { username: body.calendar.username }
	}).then(user => {
		if (user) {
			console.log("USER", user);

			var calendarParams = {
				name: body.calendar.name,
				userId: user[0].dataValues.id
			};

			Calendar.create(calendarParams)
				.then(calender => {
					res.redirect(`/calendars/${calender.id}`);
				})
				.catch(e => res.status(500).send(e.stack));
		} else {
			res.status(404).send(e.stack);
		}
	});
});

// exports
module.exports = router;
