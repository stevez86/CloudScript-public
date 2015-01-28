app.controller('DoctorController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

  var doctorID = $routeParams.doctorid; //set this to current doctor id $scope.current_user.id

  //doctors info
  $http.get('/api/doctors/'+ doctorID)
    .success(function(data, status, headers, config) {
      $scope.doctor = data;
  })

  var patientID = $routeParams.patientid;

  if (patientID) {

    $http.get('/api/doctors/'+ doctorID + '/patients/' + patientID)
      .success(function(data, status, headers, config) {
        $scope.patient = data;
    })
  }
}]);