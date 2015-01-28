app.controller('PatientController', ['$scope', '$http', '$routeParams', 'newScript', function($scope, $http, $routeParams, newScript) {

  var patientID = $routeParams.patientid; //set this to current patient id $scope.current_user.id

  $scope.newScript = newScript;

  //patients info
  $http.get('/api/patients/'+ patientID)
    .success(function(data, status, headers, config) {
      $scope.patient = data;
      $scope.newScript.script.prescriptions = true;
      $scope.prescriptions = data.prescriptions;
      $scope.prescriptionIndex = $routeParams.prescriptionIndex;
  });

  $scope.getPrescriptionPage = function() {

  };

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