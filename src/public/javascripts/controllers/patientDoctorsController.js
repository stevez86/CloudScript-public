app.controller('PatientDoctorsController', ['$scope', '$http', 'patient', function($scope, $http, patient) {


  var patientID = 15; //$scope.current_user.id

  //make this into factory
  $http.get('/api/patients/'+ patientID + '/doctors')
    .success(function(data, status, headers, config) {
      $scope.doctors = data;
  })
}]);