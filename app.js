const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const pg = require("pg");
const sequelizeCli = require("sequelize-cli");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const getPostSupport = require("express-method-override-get-post-support");

app.listen(3000, () => {
	"Now listening...";
});
