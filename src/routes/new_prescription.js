var User = require('../models/User')
var Prescription = require('../models/Prescription')

module.exports = function(req, res, next) {

  User.findOne({firebase_id: req.body.prescribing_doctor}, function(err, doctor) {
    User.findOne({_id: req.params.userid}, function(err, user) {
      Prescription.create({name: req.body.name, notes: req.body.qty, prescribing_doctor: doctor._id}, function(err, prescription) {
        user.prescriptions.push(prescription)
        user.save(function() {
          res.json(prescription);
        });
      });
    });
  });

};