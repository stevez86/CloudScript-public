var express = require('express');
var router = express.Router();
var fs = require('fs');
var http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Hello world!")
});

module.exports = router;
