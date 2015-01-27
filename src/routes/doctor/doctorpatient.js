module.exports = function(req, res, next) {

  var patientID = req.params.patientid

  //get patients from database

  res.json(
    { name: "patient " + patientID , id: patientID}
  );
};