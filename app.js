const express = require("express");
const app = new express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const router = express.Router();

const userRoutes = require("./routers/users");

//Method OverRides
const methodOverride = require("method-override");
const getPostSupport = require("express-method-override-get-post-support");

// Pass the callback and options from
// the support package
app.use(
  methodOverride(
    getPostSupport.callback,
    getPostSupport.options // { methods: ['POST', 'GET'] }
  )
);

//Handlebars settings
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    partialsDir: "views/"
  })
);
app.set("view engine", "handlebars");

//Morgan settings
const morgan = require("morgan");
const morganToolkit = require("morgan-toolkit")(morgan);
app.use(morganToolkit());

app.use("/", userRoutes);

//Server startup
app.listen(3000, () => {
  console.log("You must construct additional pylons.");
});
