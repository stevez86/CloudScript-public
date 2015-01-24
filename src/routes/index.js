var express = require('express');
var router = express.Router();
// var pm = require('../postmates.js')
var Postmates = require('postmates');
var pmcf = require('../postmates_config');
var request = require('request')


/* GET home page. */
router.get('/', function(req, res, next) {
  request('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDbHIAgfYXvD0_GwrBCSIm_-d7Z_tks_rI', function(error, response, body){
    console.log(body);
  })
  res.render('index')
});

// /* Rx page */
// /* GET rx page */
// router.get('/rx', function(req, res, next) {
//   res.render("rx")
// });

// /* POST rx page */
// router.post('/rx', function(req, res, next) {

//   //create a new order in db?

//   var postmates = new Postmates(pmcf.customerId, pmcf.testApiKey);

//   var delivery = {
//     pickup_address: "20 McAllister St, San Francisco, CA",
//     dropoff_address: "101 Market St, San Francisco, CA"
//   };

//   postmates.quote(delivery, function(err, res) {
//     // console.log(res.body.fee); // 799
//   });

//   // request('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyC8uKBdpgsKI_bwmXT_FBDE30oqO3y6OSI'), function(error, response, body){ 
//   //   console.log(body)
//   //   console.log(response)
//   //   console.log(error)
//   // }


  request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.7844147,-122.3970386&radius=5000&name=walgreens&key=AIzaSyC8uKBdpgsKI_bwmXT_FBDE30oqO3y6OSI', function(error, response, body){
    console.log(body)
  })

// });

// router.get('/printrequest', function(req, res, next) {
//   // res.send("hi");
//   console.log("hello");
// });

module.exports = router;
