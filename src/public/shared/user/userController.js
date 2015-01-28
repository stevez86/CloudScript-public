app.controller('UserController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

  var userID = $routeParams.userid; //set this to current patient id $scope.current_user.id

  //patients info
  $http.get('/api/patients/'+ patientID)
    .success(function(data, status, headers, config) {
      console.log(data);
      $scope.patient = data;
  })

  var doctorID = $routeParams.doctorid;

  if (doctorID) {

    $http.get('/api/patients/'+ patientID + '/doctors/' + doctorID)
      .success(function(data, status, headers, config) {
        $scope.doctor = data;
    })
  }
}]);