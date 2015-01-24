var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conversationSchema = new Schema({
  patient: Schema.Types.ObjectId,
  doctor:   Schema.Types.ObjectId,
  messages: Array
});

module.exports = mongoose.model('conversation', conversationSchema);