var express = require('express');
var app = express();


// ----------------------------------------
// Body Parser
// ----------------------------------------
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


const methodOverride = require('method-override');
const getPostSupport = require('express-method-override-get-post-support');

// Pass the callback and options from
// the support package
app.use(methodOverride(
  getPostSupport.callback,
  getPostSupport.options // { methods: ['POST', 'GET'] } 
));
 



// ----------------------------------------
// Public
// ----------------------------------------
app.use(express.static(`${__dirname}/public`));


// ----------------------------------------
// Logging
// ----------------------------------------
const morgan = require('morgan');
const morganToolkit = require('morgan-toolkit')(morgan);

app.use(morganToolkit());


// ----------------------------------------
// Routes
// ----------------------------------------
var usersRoutes = require('./routers/users');
let calendarsRoutes = require('./routers/calendars');
app.use('/', usersRoutes);
app.use('/calendars', calendarsRoutes);


// ----------------------------------------
// Template Engine
// ----------------------------------------
var expressHandlebars = require('express-handlebars');

var hbs = expressHandlebars.create({
  partialsDir: 'views/',
  defaultLayout: 'main'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// ----------------------------------------
// Server
// ----------------------------------------
var port = process.env.PORT ||
  process.argv[2] ||
  3000;
var host = 'localhost';

var args;
process.env.NODE_ENV === 'production' ?
  args = [port] :
  args = [port, host];

args.push(() => {
  console.log(`Listening: http://${ host }:${ port }`);
});

app.listen.apply(app, args);




module.exports = app;
