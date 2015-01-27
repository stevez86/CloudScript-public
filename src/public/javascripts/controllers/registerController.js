app.controller('registerController', ['$scope', '$location', '$http', '$cookies', function($scope, $cookies, $location, $http) {
  var ref = new Firebase("https://luminous-heat-3537.firebaseio.com");

  $scope.submit = function(credentials){

    var logPass = {email: $scope.credentials.username, password : $scope.credentials.password }

    ref.createUser(logPass, function(error) {
      if (error === null) {
        ref.authWithPassword(logPass, function(error, authData) {
          if (error) { console.log("Error", error) };
          $http({ method: "POST",
            url: "/api/users",
            params: {address:        $scope.credentials.address,
              name:           $scope.credentials.name,
              firebase_id:    authData.uid,
              avatar_url:     $scope.credentials.avatar_url,
              email:          $scope.credentials.email,
              doctor:         $scope.credentials.doctor,
              patient:        $scope.credentials.patient,
              prescriptions:  []
            }
          })
          .success(function(data) {
            $cookies.id = data.firebase_id
            $http({
                    method: "GET",
                    url: "/api/login",
                    data: {id: $cookies.id}
                  })
            .success(function(data) {
              if (data.userType === "doctor") {
                $location.path('/d/' + data.userId)
              } else if (data.userType === "patient") {
                $location.path('/p/' + data.userId)
              } else { console.log("Error!") };
            });
          });
        });
      } else { console.log("Error creating user:", error) };
    });
  };
}]);
