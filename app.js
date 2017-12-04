const express = require("express");
const app = new express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const methodOverride = require("method-override");
const getPostSupport = require("express-method-override-get-post-support");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    partialsDir: "views/"
  })
);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/users", (req, res) => {
  res.render("users");
});

app.listen(3000);
