module.exports = function(req, res, next) {

  var doctorID = req.params.id

  //get doctor from database

  res.json(
    { name: "Doctor 1", id: 69}
  );

};