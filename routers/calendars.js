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

// exports
module.exports = router;
