const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


// ----------------------------------------
// Method Override
// ----------------------------------------
app.use((req, res, next) => {
  let method;
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

// ----------------------------------------
// Static Public Files
// ----------------------------------------
app.use(express.static(`${__dirname}/public`));

// ----------------------------------------
// Logging
// ----------------------------------------
const morgan = require('morgan');
app.use(morgan('tiny'));
app.use((req, res, next) => {
  ['query', 'params', 'body'].forEach((key) => {
    if (req[key]) {
      let capKey = key[0].toUpperCase() + key.substr(1);
      let value = JSON.stringify(req[key], null, 2);
      console.log(`${ capKey }: ${ value }`);
    }
  });
  next();
});

// ----------------------------------------
// Routes
// ----------------------------------------
const users = require('./routers/users');
const calendars = require('./routers/calendars');
const events = require('./routers/events');
const invitations = require('./routers/invitations');
app.get('/', (req, res) => { res.redirect('/users'); });
app.use('/users', users);
app.use('/calendars', calendars);
app.use('/events', events);
app.use('/invitations', invitations);

// ----------------------------------------
// Template Engine
// ----------------------------------------
const expressHandlebars = require('express-handlebars');

const hbs = expressHandlebars.create({
  partialsDir: 'views/',
  defaultLayout: 'application'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// ----------------------------------------
// Server
// ----------------------------------------
const port = process.env.PORT ||
             process.argv[2] ||
             4000;
const host = 'localhost';

let args;
process.env.NODE_ENV === 'production' ?
                          args = [port] :
                          args = [port, host];

args.push(() => {
  console.log(`Listening: http://${ host }:${ port }`);
});

app.listen.apply(app, args);

module.exports = app;