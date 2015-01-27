module.exports = function(req, res, next) {

  var patientID = req.params.pid

  //get patients from database

  res.json([
    { name: "Doctor 1", id: 69},
    { name: "Doctor 2", id: 70},
    { name: "Doctor 3", id: 71},
    { name: "Doctor 4", id: 72}
  ]);
};