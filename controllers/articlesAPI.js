var axios = require("axios");
var cheerio = require("cheerio");
var Article = require("../models/article");

module.exports = function (app) {
    app.get("/", function (req, res) {
        Article.find({}).then(function (data) {
            res.render("news", {data});
        });
    });

    app.get("/news", function (req, res) {
        axios.get("https://news.google.com/?hl=en-US&gl=US&ceid=US:en").then(function (response) {
            var $ = cheerio.load(response.data);
            $("h3").each(function (i, elment) {
                var result = {};
                var title = $(this).text();

                var googlelink = $(this).children("a").attr("href").trim().split("");
                googlelink[0] = "https://news.google.com";

                var link = googlelink.join('');
                var image = $(this).parent().parent().parent().parent().children("figure").children("img").attr("src");
                var summary = $(this).parent().children("p").text();

                result.title = title;
                result.summary = summary;
                result.link = link;
                result.image = image;

                Article.create(result).then(function (dataAdded) {
                    console.log(dataAdded);
                    
                }).catch(function (err) {
                    return res.json(err);
                });
            });    
        });
        res.send("done");
    });
}