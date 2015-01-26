app.controller('registerController', ['$scope', '$http', function($scope, $http) {
  var ref = new Firebase("https://luminous-heat-3537.firebaseio.com");

  $scope.credentials = {
    username: '',
    password: ''
  }
  $scope.submit = function(credentials){

    ref.createUser({
      email    : $scope.credentials.username,
      password : $scope.credentials.password
    }, function(error) {
      $scope.credentials = {
        username: '',
        password: ''
      }
      $scope.register.$setPristine();
      if (error === null) {
        console.log("User created successfully");
      } else {
        console.log("Error creating user:", error);
      }
    });
  }
}]);