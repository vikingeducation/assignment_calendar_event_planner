const express = require('express');
const app = new express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const router = express.Router();

const userRoutes = require('./routers/users');
app.use('/', userRoutes);

//Method OverRides
const methodOverride = require('method-override');
const getPostSupport = require('express-method-override-get-post-support');

//Handlebars settings
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    partialsDir: 'views/'
  })
);
app.set('view engine', 'handlebars');

//Morgan settings
const morgan = require('morgan');
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

// //General routes
// app.get('/', (req, res) => {
//   res.render('index');
// });
//
// app.get('/users', (req, res) => {
//   res.render('users');
// });

//Server startup
app.listen(3000);
