var express = require("express");
var db = require("./models");
var path = require('path');
var PORT = process.env.PORT || 8080;
var session = require("express-session");
var app = express();

// Requiring passport as we've configured it
var passport = require("./config/passport");

// Sets up the Express App
// ===========================

app.get("/", function(req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members");
  }

  // res.sendFile(path.join(__dirname, "../Project2/public/signUp.html"));

  res.render(path.join(__dirname, "/views/pages/index.ejs"));
});

//
// create account page 
app.get('/createaccount', function(req, res) {
  res.render('pages/createaccount');
});

// Requiring our models for syncing


// app.use(require('./routes'));
app.use(express.static('public'));
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());




// Static directory


// Routes
// =============================================================
require("./routes/api-routes")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});