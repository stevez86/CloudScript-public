app.controller('PatientController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

  var patientID = $routeParams.patientid; //set this to current patient id $scope.current_user.id

  //patients info
  $http.get('/api/patients/'+ patientID)
    .success(function(data, status, headers, config) {
      console.log(data);
      $scope.patient = data;
  })

  //patients doctors
  $http.get('/api/patients/'+ patientID + '/doctors')
    .success(function(data, status, headers, config) {
      $scope.doctors = data;
  })

  //patient rxs
  $http.get('/api/patients/'+ patientID +'/rxs')
    .success(function(data, status, headers, config) {
      $scope.rxs = data;
  })

  var doctorID = $routeParams.doctorid;

  if (doctorID) {

    $http.get('/api/patients/'+ patientID + '/doctors/' + doctorID)
      .success(function(data, status, headers, config) {
        $scope.doctor = data;
    })
  }
}]);