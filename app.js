const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const methodOverride = require('method-override');
const getPostSupport = require('express-method-override-get-post-support');

app.use(methodOverride(getPostSupport.callback, getPostSupport.options));

// Logging
const morgan = require('morgan');
app.use(morgan('tiny'));

// Routes
const usersRoutes = require('./controllers/users');
const calendarsRoutes = require('./controllers/calendars');
const eventsRoutes = require('./controllers/events');
const invitationsRoutes = require('./controllers/invitations');
app.use('/', usersRoutes);
app.use('/calendars', calendarsRoutes);
app.use('/events', eventsRoutes);
app.use('/invitations', invitationsRoutes);

// Template engine
const expressHandlebars = require('express-handlebars');

const hbs = expressHandlebars.create({
  partialsDir: 'views/',
  defaultLayout: 'application'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Server
const port = process.env.PORT || process.argv[2] || 3000;
const host = 'localhost';

let args;
process.env.NODE_ENV === 'production' ? (args = [port]) : (args = [port, host]);

args.push(() => {
  console.log(`Listening: http://${host}:${port}`);
});

app.listen.apply(app, args);

module.exports = app;
