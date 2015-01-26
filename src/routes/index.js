var express = require('express');
var router = express.Router();
var Postmates = require('postmates');
var mongoose = require('mongoose');
var request = require('request');
var Q = require('q');

var Conversation = require('../models/Conversation');
var Message = require('../models/Message');
var User = require('../models/User');
var Prescription = require('../models/Prescription');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/video/test', function(req, res, next) {
  res.render('video');
})

/* GET persisted message history */
router.get('/api/messages', function(req, res, next) {
  // Hard coded find for conversation - change when authentication is implemented
  Conversation.findOne("54c56f10e4b06ac679179453", function(err, results) {
    res.json(results.messages);
  })
});

/* POST message to be persisted in MongoDB */
router.post('/api/messages', function(req, res, next) {

  // Hard coded find for conversation - change when authentication is implemented

  Conversation.findOne("54c56f10e4b06ac679179453").exec(function(err, conversation) {
    Message.create(req.body)
    .then(function(message) {
      var deferred = Q.defer();
      conversation.messages.push(message);
      deferred.resolve();
      return deferred.promise
    })
    .then(function() {
      var deferred = Q.defer();
      conversation.save(function(err, obj, numAffected) {
        if (err) deferred.reject(err)
        else deferred.resolve()
      });
      return deferred.promise
    })
    .then(function() {
      res.sendStatus(200);
    })
  })
});

/* POST to send order info to Postmates and recieve quote */
router.post('/orders', function(req, res, next) {
  //create a new order with the manifest

  var new_order = req.body;

  //get pickup address : google maps api
  var pickup_address;

  //get dropoff address: MVP: user's home address
  var dropoff_address = "874+fell+St,+San+Francisco,+CA";

  //api call to retrieve lat and lng of dropoff address
  request('https://maps.googleapis.com/maps/api/geocode/json?address=' + dropoff_address + '&key=' + process.env.GOOGLEAPI, function(error, response, body){
    var latLong = JSON.parse(body)
    var lat = latLong.results[0].geometry.location.lat
    var lng = latLong.results[0].geometry.location.lng

    //api call to retrieve walgreens within 5000 units of lat + lng
    request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lng + '&radius=5000&name=walgreens&key=' + process.env.GOOGLEAPI, function(error, response, body){
      var walgreens = JSON.parse(body)
      pickup_address = walgreens.results[0].vicinity
    })
  })

  var delivery = {
    pickup_address: pickup_address,
    dropoff_address: dropoff_address
  };

  //BELOW COMMENTED OUT JUST FOR TESTING - DND
  // var postmates = new Postmates(process.env.POSTMATES_CUSTOMER_ID, process.env.POSTMATES_TEST_API_KEY);

  // postmates.quote(delivery, function(err, res) {
  //   console.log(res.body); // 799
  // });

  res.json({ kind: 'delivery_quote',
    fee: 1350,
    created: '2015-01-24T02:04:17Z',
    expires: '2015-01-24T02:09:17Z',
    currency: 'usd',
    duration: 60,
    dropoff_eta: '2015-01-24T03:09:17Z',
    id: 'dqt_KBAxcFWu1rKuPV' });

});

// router.param('doctor', function(req, res, next, id){

  // User.find(id, function(err, doctor){
  //   if (err) {
  //     next(err);
  //   } else if (doctor) {
  //     req.doctor = doctor;
  //     next();
  //   } else {
  //     next(new Error('failed to load doctor'));
  //   }
  // });
// });

// router.param('patient', function(req, res, next, id){

  // User.find(id, function(err, patient){
  //   if (err) {
  //     next(err);
  //   } else if (patient) {
  //     req.patient = patient;
  //     next();
  //   } else {
  //     next(new Error('failed to load patient'));
  //   }
  // });
// });

module.exports = router;
