app.controller('loginController', ['$scope','$cookies', '$http', function($scope, $cookies, $http){
  var ref = new Firebase("https://luminous-heat-3537.firebaseio.com");

  $scope.credentials = {
    username: '',
    password: ''
  };

  $cookies.id = null;

  $scope.submit = function(credentials){
    console.log("submit was called");
    ref.authWithPassword({
      email: $scope.credentials.username,
      password: $scope.credentials.password
    }, function(error, authData) {
      // $scope.credentials = {
      //   username: '',
      //   password: ''
      // }
      // $scope.login.$setPristine();
      if (error) {
        console.log("Error", error);
      } else {
        console.log("Success", authData);
        $cookies.id = authData.uid;
      }
    });
  };
}]);