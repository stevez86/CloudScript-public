module.exports = function(req, res, next) {

  var patientID = req.params.patientid

  //get doctor from database

  res.json([
    { name: "Prescription 1", id: 69, refills: patientID},
    { name: "Prescription 2", id: 70, refills: 2},
    { name: "Prescription 3", id: 71, refills: 0}
  ]);

};