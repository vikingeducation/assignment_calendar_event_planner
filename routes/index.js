const express = require("express");
const router = express.Router();

let models = require("./../models");
let User = models.User;

let onIndex = (req, res) => {
	User.findAll()
		.then(users => {
			res.render("index", { users });
		})
		.catch(e => res.status(500).send(e.stack));
};

let onSingleUser = (req, res) => {
	let userid = req.params.id;

	User.findById(userid)
		.then(user => {
			res.render("user", { user });
		})
		.catch(e => res.status(500).send(e.stack));
};

let onSubmitNewUser = (req, res) => {
	const { fname, lname, username, email } = req.body;

	const params = { fname, lname, username, email };

	User.create(params).then(user => {
		res.redirect(`/users/${user.id}`);
	});
};

let onNewUser = (req, res) => {
	res.render("create_user");
};

router.get(["/", "/users"], onIndex);

router.get("/users/:id", onSingleUser);

router.get("/user/new", onNewUser);

router.post("/user/new", onSubmitNewUser);

module.exports = router;
