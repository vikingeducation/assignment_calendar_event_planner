const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");

router.get("/user/new", (req, res) => {
	res.render("create_user");
});

// Show all users
router.get(["/", "/users"], userController.showUsers);

// Show single user
router.get("/users/:id", userController.showUser);

// Show edited user
router.get("/user/:id/edit", userController.showEdited);

// Create new user
router.post("/user/new", userController.new);

// Edit single user
router.put("/user/:id/edit", userController.edit);

module.exports = router;
