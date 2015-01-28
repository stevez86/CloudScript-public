var User = require('../../models/User.js')

module.exports = function(req, res, next) {

  User.findOne({_id: req.params.doctorid}, function(err, user) {
    console.log(user);
    res.json(user);
  });

};