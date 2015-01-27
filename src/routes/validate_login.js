var User = require('../models/User');
module.exports = function(req, res, next) {
    User.findOne({firebase_id: req.query.id}).exec(function(err, user){
      if (user.patient) {res.json({userType: "patient", userId: user._id})}
      else if (user.doctor) {res.json({userType: "doctor", userId: user._id})}
      else {res.json({userType: "error"})}
    });
};
