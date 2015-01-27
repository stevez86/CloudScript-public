app.controller('PatientController', ['$scope', '$http', '$routeParams', 'newScript', function($scope, $http, $routeParams, newScript) {

  $scope.newScript = newScript
  console.log($scope.newScript.script.prescriptions);

  var patientID = $routeParams.patientid; //set this to current patient id $scope.current_user.id

  //patients info
  $http.get('/api/patients/'+ patientID)
    .success(function(data, status, headers, config) {
      $scope.patient = data;
  });

  // //patients doctors
  // $http.get('/api/patients/'+ patientID + '/doctors')
  //   .success(function(data, status, headers, config) {
  //     $scope.doctors = data;
  // })

  // //patient rxs
  // $http.get('/api/patients/'+ patientID +'/rxs')
  //   .success(function(data, status, headers, config) {
  //     $scope.rxs = data;
  // })

  var doctorID = $routeParams.doctorid;

  // if (doctorID) {

  //   $http.get('/api/patients/'+ patientID + '/doctors/' + doctorID)
  //     .success(function(data, status, headers, config) {
  //       $scope.doctor = data;
  //   });
  // }
}]);