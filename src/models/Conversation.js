var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conversationSchema = new Schema({
  users: [Schema.Types.ObjectId, Schema.Types.ObjectId],
  messages: Array
});

module.exports = mongoose.model('conversation', conversationSchema);