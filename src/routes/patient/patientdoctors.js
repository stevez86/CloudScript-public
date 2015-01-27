module.exports = function(req, res, next) {

  var patientID = req.params.patientid

  //get patients from database

  res.json([
    { name: "Doctor 1", id: patientID},
    { name: "Doctor 2", id: 70},
    { name: "Doctor 3", id: 71},
    { name: "Doctor 4", id: 72}
  ]);
};