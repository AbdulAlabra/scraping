var express = require("express");
var app = express();
var mongoose = require("mongoose");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraping";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });