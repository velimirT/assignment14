// Controller for our scraper
// ============================
var db = require("../models");
var scrape = require("../scripts/scrape");

var cheerio = require("cheerio");
module.exports = {
  scrapeHeadlines: function(req, res) {
    // scrape the NYT
    scrape()
        .then(function(response) {
          console.log("In Axios")

          // Load the HTML into cheerio and save it to a variable
          // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
          var $ = cheerio.load(response.data);

          // An empty array to save the data that we'll scrape
          var results = [];
          var count = $(".archive-list article").length;
          // With cheerio, find each p-tqag with the "title" class
          // (i: iterator. element: the current element)
          $(".archive-list article").each(function(i, element) {
            var title = $(".info h3", element).text();
            var url = $(".info h3 a", element).attr("href");
            var summary = $(".info .summary", element).text();
            console.log(title);
            db.Articles.create({title:title, url:url, summary:summary})
            .then(function(articles) {
              console.log("Created", articles);
              // If saved successfully, send the the new User document to the client
              results.push({
                title: title,
                url: url,
                summary: summary,
              });
            }).catch(function(e){console.log(e)});
            if (!--count) {
              console.log(results);
              res.json(results);
            }
          });

          // Log the results once you've looped through each of the elements found with cheerio
        })
      .catch(function(err) {
        // This query won't insert articles with duplicate headlines, but it will error after inserting the others
        console.log(err);
        res.json({
          messagee: err
        });

      });
  }
};
