var express = require('express');
var router = express.Router();
var models = require('./../models');
//var User = models.User;
var sequelize = models.sequelize;

const exphbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || '3000';

// parsers
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


// Templates!
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
});

app.post('/', (req, res) => {});

app.listen(port, () => {
  console.log('Serving!');
});