module.exports = function(req, res, next) {

  var doctorID = req.params.doctorid

  //get doctors from database

  res.json([
    { name: "Patient 1", id: doctorID},
    { name: "Patient 2", id: 70},
    { name: "Patient 3", id: 71},
    { name: "Patient 4", id: 72}
  ]);
};