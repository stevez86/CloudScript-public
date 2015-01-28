var Conversation = require('../models/Conversation')

module.exports = function(req, res, next) {

  Conversation.find({users: req.query.userid}, function(err, conversations) {
    res.json(conversations);
  })
}