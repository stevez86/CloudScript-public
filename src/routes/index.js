var express = require('express');
var router = express.Router();
var fs = require('fs');
var http = require('http')
var postmates = require('../postmates.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Hello world!")
});

/* Rx page */
/* GET rx page */
router.get('/rx', function(req, res, next) {
  res.render("rx")
});

/* POST rx page */
router.post('/rx', function(req, res, next) {
  var new_prescription = req.body

  //get dleivery location - default to home?
  //
  var options = {
    dropoff: "456 happy ball st",
    manifest: new_prescription
  }
  //get quote from postmates

  postmates.getQuote(options)
  console.log("getQuote called")
});

module.exports = router;
