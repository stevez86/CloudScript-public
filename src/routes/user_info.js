var User = require('../models/User')
var Prescription = require('../models/Prescription')

module.exports = function(req, res, next) {

User
  .findOne({_id: req.params.userid})
  .exec(function(err, user){
  	if (user.prescriptions && user.prescriptions.length > 0){
		  User
		  .findOne({_id: req.params.userid})
		  .populate('doctors')
		  .populate('patients')
		  .exec(function(err, user) {
		  	console.log(err)
		  	console.log(user)
		    res.json(user);
		  }); 		
  	}
  	else{
		  User
		  .findOne({_id: req.params.userid})
		  .populate('doctors')
		  .populate('patients')
		  .exec(function(err, user) {
		  	console.log(err)
		  	console.log(user)
		    res.json(user);
		  });
  	}
  })
};