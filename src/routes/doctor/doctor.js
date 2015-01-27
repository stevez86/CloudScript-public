module.exports = function(req, res, next) {

  var doctorID = req.params.doctorid

  //get doctor from database

  res.json(
    { name: "Doctor 1", id: doctorID}
  );

};