var express = require("express");
var mongoose = require("mongoose");
var PORT = 3000;
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.connect("mongodb://localhost/scraping", { useNewUrlParser: true });

//paste here if it does not work
var routes = require("./controllers/articlesAPI")(app);
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});

//.xrnccd F6Welf R7GTQ keNKEd j7vNaf div class