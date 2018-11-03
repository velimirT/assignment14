var db = require("../models");

module.exports = {
  clearDB: function(req, res) {
    db.Articles.remove({})
      .then(function() {
        return db.Note.remove({});
      })
      .then(function() {
        res.json({ ok: true });
      });
  }
};
