var express = require('express');
var router = express.Router();
var fs = require('fs');
var http = require('http')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Hello world!")
});

/* Rx page */
/* GET rx page */
router.get('/rx', function(req, res, next) {
  res.sendfile("./public/views/rx.html")
});

/* POST rx page */
router.post('/rx', function(req, res, next) {
  var new_prescription = req.body
  //get dleivery location - default to home?
  //
  var destination = {address: }
  //get quote from postmates
  return 'hi'
});

module.exports = router;
