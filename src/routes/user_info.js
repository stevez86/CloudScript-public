var User = require('../models/User')
var Prescription = require('../models/Prescription')

module.exports = function(req, res, next) {

  User
  .findOne({_id: req.params.userid})
  .populate('doctors')
  .populate('patients')
  .exec(function(err, user) {
    res.json(user);
  });

};