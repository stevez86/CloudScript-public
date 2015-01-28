var User = require('../../models/User.js')

module.exports = function(req, res, next) {

  User.findOne({_id: req.params.patientid}, function(err, user) {
    res.json(user);
  });

};