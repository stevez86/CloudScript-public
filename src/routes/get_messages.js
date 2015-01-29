var Conversation = require('../models/Conversation')
var User = require('../models/User')

module.exports = function(req, res, next) {

  User.findOne({firebase_id: req.query.sender}, function(err, user) {

    var query = {users: { $in : [user._id, req.query.recipient] } }

    Conversation.findOne(query, function(err, conversation) {
      console.log(conversation);
      res.json(conversation);
    });
  })

}