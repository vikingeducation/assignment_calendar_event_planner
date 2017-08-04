let models = require("./../models");
let Calendar = models.Calendar;
let User = models.User;

module.exports = {
	showCalendars: (req, res) => {
		Calendar.findAll({ order: ["id"] })
			.then(calendars => {
				let promiseArr = calendars.map(calendar => {
					return new Promise(resolve => {
						let result = User.find({
							where: { id: calendar.userId }
						}).then(user => {
							calendar["username"] = user.username;
							calendar["email"] = user.email;
						});

						resolve(result);
					});
				});

				console.log(promiseArr, "?????????");
				res.end("hi");
			})
			.catch(e => res.status(500).send(e.stack));
	}
};
