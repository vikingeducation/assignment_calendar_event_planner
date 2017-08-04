const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const getPostSupport = require("express-method-override-get-post-support");
require("dotenv").config();

const index = require("./routes/index");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use("/", index);

app.listen(3000, () => {
	console.log("Now listening...");
});
