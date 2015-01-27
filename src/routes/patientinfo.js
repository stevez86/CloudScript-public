module.exports = function(req, res, next) {

  var patientID = req.params.patientid

  // console.log('patient', patientID)
  //get doctor from database

  res.json(
    { name: "Patient "+patientID , id: patientID }
  );

};