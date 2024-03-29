/*
create all the functions that do the routing for the app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();
var word = require('../models/words.js');
var path = require("path");
var post = require('../models/posts.js')

router.get("/api/posts", function(req, res){
  post.selectAll(function(data) {
    var hbsObject = {
      posts: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  })
})

router.get("/api/post", function(req, res){
  post.selectAll(function(data) {
    var hbsObject = {
      posts: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  })
})

router.get("/aussi", function(req, res) {
    word.selectAll(function(data) {
      var hbsObject = {
        words: data
      };
      console.log(hbsObject);
      res.json(hbsObject);
    });
  });

router.post('/api/aussi', function (req, res) {
  word.findAlike({feeling: req.body.feeling},function(data) {
    var hbsObject = { 
      words: data 
    };
    res.json(hbsObject);
    console.log(hbsObject.words)
  });
});




router.post('/posts/insertOne', function (req, res) {
  post.insertOne(['title', 'body'], [req.body.title, req.body.body], function () {
    console.log("in callback");
    res.redirect('/api/posts');
  });
});

// router.put('/aussi/updateOne/:id', function (req, res) {
//   var condition = 'id = ' + req.params.id;

//   burger.updateOne({ devoured: req.body.devoured }, condition, function () {
//     res.redirect('/aussi');
//   });
// });

// router.delete('/aussi/delete/:id', function (req, res) {
//   var condition = 'id = ' + req.params.id;
//   burger.delete(condition, function () {
//     res.redirect('/aussi');
//   });
// });

module.exports = router;