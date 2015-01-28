var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var prescriptionSchema = new Schema({
  name:     String,
  notes:    String,
  ordered:  Boolean,
  refills:  Number,
  read:     Boolean
});

module.exports = mongoose.model('prescription', prescriptionSchema);
