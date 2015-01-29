var User = require('../models/User')
var Conversation = require('../models/Conversation')
var Message = require('../models/Message')

module.exports = function(req, res, next) {

  // Hard coded find for conversation - change when authentication is implemented

  User.findOne({firebase_id: req.query.sender}, function(err, user) {

    Message.create(req.body, function(err, message) {

      var query = {users: { $in : [user._id, req.query.recipient] } }

      var update = {$addToSet: {messages: message}, users: [user, req.query.recipient] }

      Conversation.findOneAndUpdate(query, update, {upsert: true}, function(err, conversation) {
        conversation.save(function() {

          res.sendStatus(200);

        });
      });
    });
  });
};

