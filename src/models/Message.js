var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  content: String,
  author:   Schema.Types.ObjectId,
  timestamp: Date
});

module.exports = mongoose.model('Message', messageSchema);