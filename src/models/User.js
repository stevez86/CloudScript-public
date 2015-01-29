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
  prescriptions:  [Schema.Types.ObjectId],
  doctors:        [{ type: Schema.Types.ObjectId, ref: 'User' }],
  patients:       [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('User', userSchema);
