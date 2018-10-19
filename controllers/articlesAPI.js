var axios = require("axios");
var cheerio = require("cheerio");
var Article = require("../models/article");
var express = require('express');
var app = express();

module.exports = function (app) {
    app.get("/all", function (req, res) {
        Article.find({}).then(function (data) {
            res.render("newscrape", { data });
        });
    });

    app.get("/", function (req, res) {
        axios.get("https://news.google.com/?hl=en-US&gl=US&ceid=US:en").then(function (response) {
            var $ = cheerio.load(response.data);
            var data = [];
            $("h3").each(function (i, elment) {
                var result = {};
                var title = $(this).text();

                var googlelink = $(this).children("a").attr("href").trim().split("");
                googlelink[0] = "https://news.google.com";

                var link = googlelink.join('');
                var image = $(this).parent().parent().parent().parent().children("figure").children("img").attr("src");
                var summary = $(this).parent().children("p").text();

                if (image === undefined) {
                    console.log(image);
                }
                else {
                    result.title = title;
                    result.summary = summary;
                    result.link = link;
                    result.image = image;
                    data.push(result);
                    Article.create(result).then(function (dataAdded) {
                    }).catch(function(err){
                        console.log("helloooo");
                        console.log(err);
                        
                    });
                }
            });
            res.render("news", { data });
        });
    });
}