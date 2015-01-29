var User = require('../models/User')

module.exports = function(req, res, next) {

  User.findOne({firebase_id: req.body.prescribing_doctor}, function(err, doctor) {

    console.log({name: req.body.name, notes: req.body.qty, prescribing_doctor: doctor._id})

    User.findOne({_id: req.params.userid}, function(err, user) {
      user.prescriptions.push({name: req.body.name, notes: req.body.qty, prescribing_doctor: doctor._id})
      user.save(function(err, user) {
        console.log(err)
        console.log(user)
      });
    });
  });
};