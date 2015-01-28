var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  address:        String,
  name:           String,
  firebase_id:    String,
  avatar_url:     String,
  email:          String,
  doctor:         Boolean,
  patient:        Boolean,
  prescriptions:  Array,
  doctors:        Array,
  patients:       Array
});

module.exports = mongoose.model('User', userSchema);
