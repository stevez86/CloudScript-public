var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var prescriptionSchema = new Schema({
  name:     String,
  notes:    String,
  ordered:  Boolean,
  read:     Boolean,
  refills:  Number,
  prescribing_doctor: Schema.Types.ObjectId
});

module.exports = mongoose.model('prescription', prescriptionSchema);
