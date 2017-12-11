const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const getPostSupport = require('express-method-override-get-post-support');
const users = require('./routes/users');
const calendars = require('./routes/calendars');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride(
  getPostSupport.callback,
  getPostSupport.options // { methods: ['POST', 'GET'] }
));

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

app.use(express.static(`${__dirname}/public`));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.use('/', users);
app.use('/calendars', calendars);



app.listen(3000, () => {
  console.log('Listening on port 3000');
});
