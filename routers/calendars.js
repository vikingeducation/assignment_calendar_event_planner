var express = require("express");
var router = express.Router();
var models = require("./../models");
var Calendar = models.Calendars;
var sequelize = models.sequelize;
var User = models.Users;

//define associations
User.hasMany(Calendar, { foreignKey: "userId" });
Calendar.belongsTo(User, { foreignKey: "userId" });

// instead of making multiple queries I joined them
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
			// console.log("CALENDARS:", JSON.stringify(calendars, null, 2));
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
				// console.log("calendar:", JSON.stringify(calendar, null, 2));
				res.render("calendars/show", { calendar });
			} else {
				res.send(404);
			}
		})
		.catch(e => res.status(500).send(e.stack));
});

//edit form show

router.get("/calendars/:id/edit", (req, res) => {
	Calendar.findById(req.params.id, {
		include: [
			{
				model: User
			}
		]
	})
		.then(calendar => {
			if (calendar) {
				res.render("calendars/edit", { calendar });
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
			// console.log("USER", user);

			var calendarParams = {
				name: body.calendar.name,
				userId: user[0].dataValues.id
			};

			Calendar.create(calendarParams)
				.then(calendar => {
					res.redirect(`/calendars/${calendar.id}`);
				})
				.catch(e => res.status(500).send(e.stack));
		} else {
			res.status(404).send(e.stack);
		}
	});
});

// update a calendar with put

router.put("/calendars/:id", (req, res) => {
	var calendarParams = req.body.calendar;

	Calendar.update(
		{
			name: calendarParams.name
		},
		{
			where: { id: req.params.id },
			limit: 1
		}
	)
		.then(() => {
			req.method = "GET";
			res.redirect(`/calendars/${req.params.id}`);
		})
		.catch(e => res.status(500).send(e.stack));
});

// destroy a calendar
router.delete("/calendars/:id", (req, res) => {
	Calendar.destroy({
		where: { id: req.params.id },
		limit: 1
	})
		.then(() => {
			req.method = "GET";
			res.redirect("/calendars");
		})
		.catch(e => res.status(500).send(e.stack));
});

// exports
module.exports = router;
