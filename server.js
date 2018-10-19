var express = require("express");
var mongoose = require("mongoose");
var PORT = 3000;
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraping";

mongoose.connect(MONGODB_URI);
//paste here if it does not work
require("./controllers/articlesAPI")(app);
app.use(express.static("public"));
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});

//.xrnccd F6Welf R7GTQ keNKEd j7vNaf div class