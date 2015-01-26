app.service('loginHelper', ['$http', function($http) {
  var self = this;
  this.loggedInAs = function(id) {
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
}]);
