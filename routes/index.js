const express = require("express");
const router = express.Router();
const { UserController } = require("../controllers");

router.get("/user/new", (req, res) => {
	res.render("create_user");
});

// Show all users
router.get(["/", "/users"], UserController.showUsers);

// Show single user
router.get("/users/:id", UserController.showUser);

// Show edited user
router.get("/user/:id/edit", UserController.showEdited);

// Create new user
router.post("/user/new", UserController.new);

// Edit single user
router.put("/user/:id/edit", UserController.edit);

// Delete user
router.delete("/user/:id/delete", UserController.remove);

module.exports = router;
