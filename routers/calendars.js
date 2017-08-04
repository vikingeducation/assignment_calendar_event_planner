var express = require("express");
var router = express.Router();
var models = require("./../models");
var calendars = models.calendars;
var users = models.users;
var sequelize = models.sequelize;

let grabCalendars = (req, res) => {
  calendars.findAll().then(calendars => {
    res.render("calendars/index", { calendars });
  });
};

router.get("/", grabCalendars);

router.get("/new", (req, res) => {
  res.render("calendars/new");
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  calendars.findById(id).then(calendars => {
    res.render("calendars/show", { calendars });
  });
});
//
// router.get("/calendars/:id/edit", (req, res) => {
//   let id = req.params.id;
//   calendars.findById(id).then(calendars => {
//     res.render("calendars/edit", { calendars });
//   });
//   console.log("GOT A A GET /EDIT");
// });

router.post("/", (req, res) => {
  let params = {
    name: req.body.name.trim(),
    email: req.body.email.trim()
  };
  users
    .findAll({
      where: { email: email }
    })
    .then(user => {
      calendars
        .create({
          userid: user.id,
          name: params.name
        })
        .then(calendar => {
          res.redirect("/");
        });
    });

  // users
  //   .create(params)
  //   .then(user => {
  //     res.redirect(`/users/${user.id}`);
  //   })
  //   .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
