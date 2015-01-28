module.exports = function(req, res, next) {

  var doctorID = req.params.doctorid

  //get doctor rxs from database

  res.json([
    { name: "Prescription 1", id: 69, refills: doctorID},
    { name: "Prescription 2", id: 70, refills: 2},
    { name: "Prescription 3", id: 71, refills: 0}
  ]);
};