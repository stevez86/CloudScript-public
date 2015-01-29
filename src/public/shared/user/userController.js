app.controller('userController', ['$scope', '$route', '$http', '$routeParams', 'newScript', function($scope, $route, $http, $routeParams, newScript) {

  var userId = $routeParams.userid;

  $http.get('/api/users/' + userId)
  .success(function(data) {
    $scope.user = data;
  });

  $scope.getUserInfo = function(){
  	$http.get('/api/users/' + userId)
    .success(function(data) {
      $scope.user = data;
      console.log(data)
    });
  }
}]);