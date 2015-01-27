app.service('loginHelper', ['$location','$http', function($location, $http) {
  this.logIn = function(id){
    $http.get('/api/login?id='+id).success(function(data){
      console.log(data)
      if (!data || data === "error") {
        $location.path = "/"
      } else if (data === "doctor") {
        $location.path = "/d"
      } else if (data === "patient") {
        $location.path = "/p"
      }
    })
  }
}]);
