module.exports = function(req, res, next) {

  var doctorID = req.params.doctorid

  //get patients from database

  res.json(
    { name: "Doctor " + doctorID , id: doctorID}
  );
};