var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Put this AFTER your body-parser set up

// Require the two packages
const methodOverride = require('method-override');
const getPostSupport = require('express-method-override-get-post-support');

// Pass the callback and options from
// the support package
app.use(
  methodOverride(
    getPostSupport.callback,
    getPostSupport.options // { methods: ['POST', 'GET'] }
  )
);

app.use(express.static(`${__dirname}/public`));

// Configure body-parser before morgan!!!

// Configure morgan
var morgan = require('morgan');
app.use(morgan('tiny'));

app.use((req, res, next) => {
  ['query', 'params', 'body'].forEach(key => {
    if (req[key]) {
      var capKey = key[0].toUpperCase() + key.substr(1);
      var value = JSON.stringify(req[key], null, 2);
      console.log(`${capKey}: ${value}`);
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

var routes = require('./routers/routes');
app.use('/', routes);

// ----------------------------------------
// Server
// ----------------------------------------
var port = process.env.PORT || process.argv[2] || 3000;
var host = 'localhost';

var args;
process.env.NODE_ENV === 'production' ? (args = [port]) : (args = [port, host]);

args.push(() => {
  console.log(`Listening: http://${host}:${port}`);
});

app.listen.apply(app, args);

module.exports = app;
