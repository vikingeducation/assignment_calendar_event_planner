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

let onSingleUser = (req, res, id) => {
	User.findById(id)
		.then(user => {
			res.render("user", { user });
		})
		.catch(e => res.status(500).send(e.stack));
};

router.get(["/", "/users"], onIndex);
router.get("/users/:id", (req, res) => {
	let userid = req.params.id;
	onSingleUser(req, res, userid);
});

module.exports = router;
