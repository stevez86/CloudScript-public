module.exports = function(req, res, next, id){

  User.find(id, function(err, doctor){
    if (err) {
      next(err);
    } else if (doctor) {
      req.doctor = doctor;
      next();
    } else {
      next(new Error('failed to load doctor'));
    }
  });
};