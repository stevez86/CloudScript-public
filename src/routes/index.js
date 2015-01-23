var express = require('express');
var router = express.Router();
// var pm = require('../postmates.js')
var Postmates = require('postmates');
var pmcf = require('../postmates_config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
});

/* Rx page */
/* GET rx page */
router.get('/rx', function(req, res, next) {
  res.render("rx")
});

/* POST rx page */
router.post('/rx', function(req, res, next) {

  //create a new order in db?

  var postmates = new Postmates(pmcf.customerId, pmcf.testApiKey);

  var delivery = {
    pickup_address: "20 McAllister St, San Francisco, CA",
    dropoff_address: "101 Market St, San Francisco, CA"
  };

  postmates.quote(delivery, function(err, res) {
    console.log(res.body); // 799
  });

});

router.get('/printrequest', function(req, res, next) {
  // res.send("hi");
  console.log("hello");
});

module.exports = router;
