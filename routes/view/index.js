var router = require("express").Router();
var db = require("../../models");

// This route renders the homepage
router.get("/", function(req, res) {
  db.Articles.find({})
    .sort({ date: -1 })
    .then(function(dbArticles) {
      res.render("home", { articles: dbArticles });
    });
});
// This route renders the saved handlebars page


module.exports = router;
