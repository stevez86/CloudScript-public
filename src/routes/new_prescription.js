var User = require('../models/User')

module.exports = function(req, res, next) {
  var name = req.body.name // Drug name
  var qty = req.body.qty // Drug quantity
  var patientID = req.body.patientID // Patient ID
  var doctorID = req.body.doctorID // Doctor ID

  User.findOne({_id: patientID}, function(err, patient) {
    patient.prescriptions.push({name: name, notes: qty, prescribing_doctor: doctorID});
    patient.save();
    res.send(patient);
  })
}