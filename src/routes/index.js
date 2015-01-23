var express = require('express');
var router = express.Router();
var _ = require('highland');
var rp = require('request-promise');
var fs = require('fs');
var http = require('http')

/* GET home page. */
router.get('/', function(req, res, next) {

  var options1 = {
    uri : "http://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452",
    method : 'GET',
    resolveWithFullResponse: true
  };

  rp(options1).pipe(res)
});

module.exports = router;
