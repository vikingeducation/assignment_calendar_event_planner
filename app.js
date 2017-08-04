const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const expressHandlebars = require("express-handlebars");
const morgan = require("morgan");
const methodOverride = require("method-override");
const getPostSupport = require("express-method-override-get-post-support");
const morganToolKit = require("morgan-toolkit")(morgan, {
  req: ["cookies", "signedCookies"]
});

const userRoutes = require("./routers/users");
console.log(getPostSupport.options);
app.use(methodOverride(getPostSupport.callback, getPostSupport.options));

// Set up morgan routes
app.use(morgan("tiny"));
app.use(morganToolKit());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", userRoutes);

// Express handlebars
const hbs = expressHandlebars.create({
  partials: "views/",
  defaultLayout: "main"
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

const port = process.env.PORT || 3000;
const host = "localhost";

let args;
process.env.NODE_ENV === "production" ? (args = [port]) : (args = [port, host]);

args.push(() => {
  console.log(`Listening: http://${host}:${port}`);
});

app.listen.apply(app, args);
