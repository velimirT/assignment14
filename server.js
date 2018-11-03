// Add code to userModel.js to complete the model

var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");
var handlebars = require("express-handlebars");
var routes = require("./routes");

var PORT = 3000;

// Requiring the `User` model for accessing the `users` collection
// var Articles = require("./articlesModel.js");

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


// Connect to the Mongo DB

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(routes);
// Routes

mongoose.connect("mongodb://localhost/news_articles", { useNewUrlParser: true });
// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
