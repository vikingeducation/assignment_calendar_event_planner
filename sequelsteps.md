Initialize and install requirements:
npm init
npm i -S sequelize pg pg-hstore morgan express express-handlebars body-parser

Create sequelize structure:
sequelize init

Create mongodb database(s):
createdb my_project_development
createdb my_project_test

Edit config/config.json to use the databases you created:
Set username to your local username
Set databases to the databases you created in last step
Set dialect to 'postgres'

Create migration and model with name and fields:
sequelize model:create --name NameOfModel --attributes "frstAttr:string scndAttr:integer thrdAttr:datetime"

Change createdAt and updatedAt at for newly created migration to include defaults:
createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }

Create seed with name:
sequelize seed:create --name SeedName

Add some method of creating data in new seed file in the UP method, e.g.:
var users = [];
 for (let i = 0; i < 10; i++) {
   users.push({
     fname: `Foo${ i }`,
     lname: `Bar${ i }`,
     username: `foobar${ i }`,
     email: `foobar${ i }@gmail.com`
   });
 }
 return queryInterface.bulkInsert('Users', users);
 ***

 **Add following to scripts in package.json to be able to use "npm run seed" undo migrations, run migrations, and seed all:

 "seed": "sequelize db:migrate:undo:all && sequelize db:migrate && sequelize db:seed:all"
 ***

 **Create or add to repl.js :

 var repl = require('repl').start({});
var models = require('./models');


// Make the `models` object
// a global variable in the
// REPL
repl.context.models = models;


// Make each model a global
// object in the REPL
Object.keys(models).forEach((modelName) => {
  repl.context[modelName] = models[modelName];
});


// Provide a convenience function `lg`
// to pass to `then()` and `catch()`
// to output less verbose values for
// sequelize model query results
repl.context.lg = (data) => {
  if (Array.isArray(data)) {
    if (data.length && data[0].dataValues) {
      data = data.map(item => item.dataValues);
    }
  } else {
    if (data.dataValues) {
      data = data.dataValues;
    }
  }
  console.log(data);
};
***

**Add to scripts in package.json to be able to run 'npm run c':
"console": "node repl.js",
    "c": "node repl.js",
***



**require body-parser, morgan, and handlebars in app.js/index.js:

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var morgan = require('morgan');
app.use(morgan('tiny'));

app.use((req, res, next) => {
  ['query', 'params', 'body'].forEach((key) => {
    if (req[key]) {
      var capKey = key[0].toUpperCase() + key.substr(1);
      var value = JSON.stringify(req[key], null, 2);
      console.log(`${ capKey }: ${ value }`);
    }
  });
  next();
});

var expressHandlebars = require('express-handlebars');

var hbs = expressHandlebars.create({
  partialsDir: 'views/',
  defaultLayout: 'application'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
***

**application.handlebars layout:

< !DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>
      Demo Exploring Sequelize
      {{#if title }}
        | {{ title }}
      {{/if }}
    </title>

    < !-- Include Bootstrap/jQuery here -->
  </head>
  <body>
    {{> shared/_nav }}
    <main class="container">
      {{{ body }}}
    </main>
  </body>
</html>

***

**Users index route:

// models/user.js

'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
***

**views/users/index.handlebars

<header class="page-header">
  <h1>Users</h1>
  <a href="/users/new" class="btn btn-primary">+ New User</a>
</header>


{{#if users.length }}
  <table class="table">
    <thead>
      <tr>
        <th>Firstname</th>
        <th>Last Name</th>
        <th>Username</th>
        <th>Email</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {{#each users as |user| }}
      <tr>
        <td>
          <a href="/users/{{ user.id }}">{{ user.fname }}</a>
        </td>
        <td>
          <a href="/users/{{ user.id }}">{{ user.lname }}</a>
        </td>
        <td>
          <a href="/users/{{ user.id }}">{{ user.username }}</a>
        </td>
        <td>
          <a href="/users/{{ user.id }}">{{ user.email }}</a>
        </td>
        <td>
          <a href="/users/{{ user.id }}/edit">Edit</a>
        </td>
        <td>
          <a href="/users/{{ user.id }}?_method=delete" class="text-danger">Delete</a>
        </td>
      </tr>
      {{/each }}
    </tbody>
  </table>
{{else }}
  <p class="text-danger">No users</p>
{{/if }}

***Add to app.js:

var usersRoutes = require('./routers/users');
app.use('/', usersRoutes);

**

***Create routers/users.js:

// routers/users.js

var express = require('express');
var router = express.Router();
var models = require('./../models');
var User = models.User;
var sequelize = models.sequelize;

**
