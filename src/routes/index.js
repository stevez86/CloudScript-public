var express = require('express');
var router = express.Router();
// var pm = require('../postmates.js')
var Postmates = require('postmates');
var pmcf = require('../postmates_config');
var mongoose = require('mongoose');
var Conversation = require('../models/Conversation');
var Message = require('../models/Message');
var Q = require('q');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/api/messages', function(req, res, next) {
  Conversation.create();
  // Hard coded find for conversation - change when authentication is implemented
  Conversation.findOne("54c2e4a1b976b78fbceb112d", function(err, results) {
    console.log(results.messages)
    res.json(results.messages);
  })
});

router.post('/api/messages', function(req, res, next) {
  Conversation.findOne("54c2e4a1b976b78fbceb112d").exec(function(err, conversation) {
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
      console.log(conversation.messages);
      res.send(200);
    })
  })
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
