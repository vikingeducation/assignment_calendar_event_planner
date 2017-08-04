let models = require("./../models");
let User = models.User;

module.exports = {
	showUsers: (req, res) => {
		User.findAll({ order: ["id"] })
			.then(users => {
				res.render("index", { users });
			})
			.catch(e => res.status(500).send(e.stack));
	},

	showUser: (req, res) => {
		let userid = req.params.id;

		User.findById(userid)
			.then(user => {
				res.render("user", { user });
			})
			.catch(e => res.status(500).send(e.stack));
	},

	new: (req, res) => {
		const { fname, lname, username, email } = req.body;

		const params = { fname, lname, username, email };

		User.create(params)
			.then(user => {
				res.redirect(`/users/${user.id}`);
			})
			.catch(e => res.status(500).send(e.stack));
	},

	showEdited: (req, res) => {
		let userid = req.params.id;

		User.findById(userid)
			.then(user => {
				res.render("update_user", { user });
			})
			.catch(e => res.status(500).send(e.stack));
	},

	edit: (req, res) => {
		const { fname, lname, username, email } = req.body;

		const params = { fname, lname, username, email };
		const options = { where: { id: req.params.id } };

		User.update(params, options)
			.then(user => {
				res.redirect(`/users/${req.params.id}`);
			})
			.catch(e => res.status(500).send(e.stack));
	},

	remove: (req, res) => {
		let options = {
			where: { id: req.params.id },
			limit: 1
		};

		User.destroy(options)
			.then(user => {
				res.redirect("/");
			})
			.catch(e => res.status(500).send(e.stack));
	}
};
