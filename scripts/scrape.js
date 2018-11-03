// scrape script
// =============

// Require axios and cheerio, making our scrapes possible
var axios = require("axios");
var cheerio = require("cheerio");

// This function will scrape the NYTimes website
var scrape = function() {
  console.log("Scraped");
  // Scrape the NYTimes website
  return axios.get("https://www.newsweek.com/newsfeed")
};

// Export the function, so other files in our backend can use it
module.exports = scrape;
