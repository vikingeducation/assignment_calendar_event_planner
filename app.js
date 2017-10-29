const express = require('express');
const app = express();


// ----------------------------------------
// Body Parser
// ----------------------------------------
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


// ----------------------------------------
// Method Override
// ----------------------------------------
app.use((req, res, next) => {
  if (req.query._method || req.body._method) {
    let method = req.query._method || req.body._method;
    req.method = method.toUpperCase();
    req.url = req.path;
  }
  next();
});


// ----------------------------------------
// Public
// ----------------------------------------
app.use(express.static(`${__dirname}/public`));


// ----------------------------------------
// Logging
// ----------------------------------------
const logger = require('morgan');
const morganToolkit = require('morgan-toolkit')(logger);

app.use(morganToolkit());


// ----------------------------------------
// Sessions/Cookies
// ----------------------------------------
var cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: ['asdf1234567890qwer']
}));


// ----------------------------------------
// Flash Messages
// ----------------------------------------
var flash = require('express-flash-messages');
app.use(flash());


// ----------------------------------------
// Routes
// ----------------------------------------
const users = require('./routers/users');
const calendars = require('./routers/calendars');
const events = require('./routers/events');

app.use('/', users);
app.use('/calendars', calendars);
app.use('/events', events);


// ----------------------------------------
// Template Engine
// ----------------------------------------
const expressHandlebars = require('express-handlebars');
const helpers = require('./helpers');

const hbs = expressHandlebars.create({
  helpers: helpers,
  partialsDir: 'views/',
  defaultLayout: 'application',
  extname: '.hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


// ----------------------------------------
// Server
// ----------------------------------------
var port = process.env.PORT ||
  process.argv[2] ||
  3000;
var host = 'localhost';

var args;
if (process.env.NODE_ENV === 'production') {
  args = [port];
} else {
  args = [port, host];
}

args.push(() => {
  console.log(`Listening: http://${ host }:${ port }`);
});

app.listen.apply(app, args);
