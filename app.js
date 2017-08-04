const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const getPostSupport = require("express-method-override-get-post-support");
const morgan = require("morgan");
const usersRoutes = require("./routers/users");
const calendarsRoutes = require("./routers/calendars");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(morgan("tiny"));
app.use((req, res, next) => {
  ["query", "params", "body"].forEach(key => {
    if (req[key]) {
      var capKey = key[0].toUpperCase() + key.substr(1);
      var value = JSON.stringify(req[key], null, 2);
      console.log(`${capKey}: ${value}`);
    }
  });
  next();
});

app.use(
  methodOverride(
    getPostSupport.callback,
    getPostSupport.options // { methods: ['POST', 'GET'] }
  )
);

app.use("/", usersRoutes);
app.use("/calendars", calendarsRoutes);

var expressHandlebars = require("express-handlebars");

var hbs = expressHandlebars.create({
  partialsDir: "views/",
  defaultLayout: "main"
});

app.engine("handlebars", hbs.engine); //hbs.engine ??
app.set("view engine", "handlebars");

var port = process.env.PORT || process.argv[2] || 3000;
var host = "0.0.0.0";

var args;
process.env.NODE_ENV === "production" ? (args = [port]) : (args = [port, host]);

args.push(() => {
  console.log(`Listening: http://${host}:${port}`);
});

app.listen.apply(app, args);

module.exports = app;
