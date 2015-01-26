var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  address:        String,
  name:           String,
  firebase_id     String,
  home_address:   String,
  avatar_url:     String,
  doctor:         Boolean,
  patient:        Boolean,
  prescriptions:  Array
});

module.exports = mongoose.model('user', userSchema);
