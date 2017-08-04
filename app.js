const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const getPostSupport = require("express-method-override-get-post-support");
require("dotenv").config();

app.listen(3000, () => {
	"Now listening...";
});
