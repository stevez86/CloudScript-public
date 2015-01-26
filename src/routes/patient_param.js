module.exports = function(req, res, next, id){

  User.find(id, function(err, patient){
    if (err) {
      next(err);
    } else if (patient) {
      req.patient = patient;
      next();
    } else {
      next(new Error('failed to load patient'));
    }
  });
};