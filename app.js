const express = require("express");
const expressHbs = require("express-handlebars");
const bodyParser = require("body-parser");

const app = express();
const hbs = expressHbs.create({
  partialsDir: "views/",
  extname: ".hbs",
  defaultLayout: "main"
});
app.set("view engine", "hbs");
app.engine("hbs", hbs.engine);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// logging

const morgan = require('morgan');
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

// method override

app.use((req, res, next) => {
  var method;
  if (req.query._method) {
    method = req.query._method;
    delete req.query._method;
  } else if (typeof req.body === 'object' && req.body._method) {
    method = req.body._method;
    delete req.body._method;
  }

  if (method) {
    method = method.toUpperCase();
    req.method = method;
  }

  next();
});


const userIndex = require('./routes/users');
app.use('/', userIndex);

// server

const port = process.env.PORT ||
  process.argv[2] ||
  3000;
const host = 'localhost';

process.env.NODE_ENV === 'production' ?
  args = [port] :
  args = [port, host];

args.push(() => {
  console.log(`Listening: http://${ host }:${ port }`);
});

app.listen.apply(app, args);

module.exports = app;
