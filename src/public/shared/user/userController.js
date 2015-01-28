app.controller('UserController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

  var userId = $routeParams.userId; //set this to current doctor id $scope.current_user.id

  //doctors info
  $http.get('/api/user/'+ userId)
    .success(function(data, status, headers, config) {
      $scope.user = data;
  })


  var patientID = $routeParams.patientid;
  if (patientID) {
    $http.get('/api/user/'+ userId + '/patients/' + patientID)
      .success(function(data, status, headers, config) {
        $scope.patient = data;
    })
  }
  
}]);