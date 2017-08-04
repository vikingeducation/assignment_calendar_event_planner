var express = require("express");
var router = express.Router();
var models = require("./../models");
var users = models.users;
var sequelize = models.sequelize;

let grabUsers = (req, res) => {
  users.findAll().then(users => {
    res.render("users/index", { users });
  });
};
//grab all the users info
router.get("/", grabUsers);
router.get("/users", grabUsers);

//create new user
router.get("/users/new", (req, res) => {
  res.render("users/new");
});

router.get('/users/:id', (req, res)=> {
  let id = req.params.id;
  users.findById(id).then((user)=> {
    res.render('/users/show', {user})
  })
})

router.get('/users/:id/edit', (req, res)=> {
  let id = req.params.id;
  users.update()
})

router.post("/users", (req, res)=> {
  let params = {
    fname = req.body.user.fname,
    lname = req.body.user.lname,
    email = req.body.user.email,
    username = req.body.user.username
  };
  users.create(params).then(
    (user)=> {
      res.redirect(`/users/${ user.id}`)

  })
  .catch((e) => res.status(500).send(e.stack));
});
// //create new user
// router.get('/users/new', (req, res) => {
//
// })

//
// // ----------------------------------------
// // Index
// // ----------------------------------------
// var onIndex = (req, res) => {
//   User.findAll()
//     .then((users) => {
//       res.render('users/index', { users });
//     })
//     .catch((e) => res.status(500).send(e.stack));
// };
// router.get('/', onIndex);
// router.get('/users', onIndex);
//
//
// // ----------------------------------------
// // New
// // ----------------------------------------
// router.get('/users/new', (req, res) => {
//   res.render('users/new');
// });
//
//
// // ----------------------------------------
// // Edit
// // ----------------------------------------
// router.get('/users/:id/edit', (req, res) => {
//   User.findById(req.params.id)
//     .then((user) => {
//       if (user) {
//         res.render('users/edit', { user })
//       } else {
//         res.send(404);
//       }
//     })
//     .catch((e) => res.status(500).send(e.stack));
// });
//
//
// // ----------------------------------------
// // Show
// // ----------------------------------------
// router.get('/users/:id', (req, res) => {
//   User.findById(req.params.id)
//     .then((user) => {
//       if (user) {
//         res.render('users/show', { user });
//       } else {
//         res.send(404);
//       }
//     })
//     .catch((e) => res.status(500).send(e.stack));
// });
//
//
// // ----------------------------------------
// // Create
// // ----------------------------------------
// router.post('/users', (req, res) => {
//   var body = req.body;
//
//   var userParams = {
//     fname: body.user.fname,
//     lname: body.user.lname,
//     username: body.user.username,
//     email: body.user.email
//   };
//
//   User.create(userParams)
//     .then((user) => {
//       res.redirect(`/users/${ user.id }`);
//     })
//     .catch((e) => res.status(500).send(e.stack));
// });
//
//
// // ----------------------------------------
// // Update
// // ----------------------------------------
// router.put('/users/:id', (req, res) => {
//   var userParams = req.body.user;
//
//   User.update({
//     fname: userParams.fname,
//     lname: userParams.lname,
//     username: userParams.username,
//     email: userParams.email
//   }, {
//     where: { id: req.params.id },
//     limit: 1
//   })
//     .then(() => {
//       req.method = 'GET';
//       res.redirect(`/users/${ req.params.id }`);
//     })
//     .catch((e) => res.status(500).send(e.stack));
// });
//
//
// // ----------------------------------------
// // Destroy
// // ----------------------------------------
// router.delete('/users/:id', (req, res) => {
//   User.destroy({
//     where: { id: req.params.id },
//     limit: 1
//   })
//     .then(() => {
//       req.method = 'GET';
//       res.redirect('/users');
//     })
//     .catch((e) => res.status(500).send(e.stack));
// });
//

module.exports = router;
