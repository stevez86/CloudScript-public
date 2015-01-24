var express = require('express');
var router = express.Router();
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

module.exports = router;
