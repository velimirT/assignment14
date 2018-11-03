// Controller for our headlines
// ============================
var db = require("../models");

module.exports = {
  // Find all headlines, sort them by date, send them back to the user
  findAll: function(req, res) {
    db.Articles
      .find(req.query)
      .sort({ created: -1 })
      .then(function(dbHeadline) {
        res.json(dbHeadline);
      }).catch(function(e){res.json(e);});
  },
  // Delete the specified headline
  delete: function(req, res) {
    db.Articles.remove({ _id: req.params.id }).then(function(dbHeadline) {
      res.json(dbHeadline);
    });
  },
  // Update the specified headline
  update: function(req, res) {
    db.Articles.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then(function(dbHeadline) {
      res.json(dbHeadline);
    });
  }
};
