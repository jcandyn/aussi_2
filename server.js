// Dependencies
// =============================================================
var express = require("express") ;
var bodyParser = require('body-parser');
// var methodOverride = require('method-override');
var router = require('./controllers/aussi_controller');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 8080;


app.use(bodyParser.urlencoded({
  extended: false
}));
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(methodOverride('_method'));


app.use('/', router);
app.use(express.static("public"));

  var port = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log("App is listening on port " + port);
});