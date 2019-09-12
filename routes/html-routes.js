// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // Route to the create post page
  app.get("/post", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/post.html"));
  });

  // route loads matching.html
  app.get("/matching", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/matching.html"));
  });

//   route loads discussion.html
  app.get("/discussion", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/discussion.html"));
  });
};
