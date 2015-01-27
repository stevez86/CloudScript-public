module.exports = function(req, res, next) {
  var loggedInAs = function(id) {
    if (!id || User.count({'firebase_id': id}) === 0) {
      return false
    } else if (User.count({'firebase_id': id}) !== 1) {
      return "error"
    } else {
      if (User.findOne({'firedbase_id': id}).doctor && User.findOne({'firedbase_id': id}).patient){
        return "error"
      } else if(User.findOne({'firedbase_id': id}).doctor){
        return "doctor"
      } else if (User.findOne({'firedbase_id': id}).patient) {
        return "patient"
      }
    }
  }

  var response = loggedInAs(req.query.id)
  res.json({value: response})
};
