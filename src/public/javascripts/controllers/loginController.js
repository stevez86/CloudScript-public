app.controller('loginController', ['$location', '$scope', '$cookies', '$http', function($location, $scope, $cookies, $http){
  var ref = new Firebase("https://luminous-heat-3537.firebaseio.com");

  $scope.submit = function(credentials){
    ref.authWithPassword({
      email: $scope.credentials.username,
      password: $scope.credentials.password
    }, function(error, authData) {
      if (error) { console.log("Error", error) }
      else {
        $cookies.id = authData.uid
        $http({ method: "GET",
                url: "/api/login",
                params: {id: $cookies.id}
              })
        .success(function(data) {
          if (data.userType === "doctor") {
            $location.path('/d/' + data.userId)
          } else if (data.userType === "patient") {
            $location.path('/p/' + data.userId)
          } else { console.log("Error!") };
        });
      }
    })
  }
}]);
