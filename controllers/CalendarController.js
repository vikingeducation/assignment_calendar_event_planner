let models = require("./../models");
let Calendar = models.Calendar;
let User = models.User;

module.exports = {
	showCalendars: (req, res) => {
		showUsers: (req, res) => {
		Calendar.findAll({ order: ["id"] })
			.then(calendar => {
				User.find({where: {id: calendar.userId}}).then(user => {
					//stuff happens
				})
			})
			.catch(e => res.status(500).send(e.stack));
	},
	}
};
