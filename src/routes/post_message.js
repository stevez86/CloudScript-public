var User = require('../models/User')
var Conversation = require('../models/Conversation')
var Message = require('../models/Message')

module.exports = function(req, res, next) {

  // Hard coded find for conversation - change when authentication is implemented

  User.findOne({firebase_id: req.query.sender}, function(err, user) {

    var query = {users: { $in : [user._id, req.query.recipient] } }

    Message.create(req.body, function(err, message) {

      Conversation.findOneAndUpdate(query, {$addToSet: {messages: message}, users: [user, req.query.recipient] }, {upsert: true}, function(err, conversation) {

        console.log(conversation);
        conversation.save(function(err, obj, numAffected) {
          res.sendStatus(200);
        });

      });

    })

  });

};

