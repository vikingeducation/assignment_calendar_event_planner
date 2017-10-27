var express = require("express");
var router = express.Router();
var models = require("./../models");
var sequelize = models.sequelize;
var _Event = models.Events;
var User = models.Users;
var Invitation = models.Invitations;
var Calendar = models.Calendars;

// define associations this is annoying
User.hasMany(Invitation, { foreignKey: "user_id" });
Invitation.belongsTo(User, { foreignKey: "user_id" });
_Event.hasMany(Invitation, { foreignKey: "event_id" });
Invitation.belongsTo(_Event, { foreignKey: "event_id" });

Calendar.hasMany(_Event, { foreignKey: "calendar_id" });
_Event.belongsTo(Calendar, { foreignKey: "calendar_id" });
User.hasMany(Calendar, { foreignKey: "userId" });
Calendar.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Calendar, { foreignKey: "userId" });
Calendar.belongsTo(User, { foreignKey: "userId" });

//
var onIndex = (req, res) => {
	Invitation.findAll({
		include: [
			{
				model: _Event,
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
			}
		]
	}) // bracket disaster
		.then(invitations => {
			res.render("invitations/index", { invitations });
			console.log("INVITATIONS:", JSON.stringify(invitations, null, 2));
		})
		.catch(e => res.status(500).send(e.stack));
};

//Get Event index

router.get("/invitations", onIndex);

module.exports = router;
