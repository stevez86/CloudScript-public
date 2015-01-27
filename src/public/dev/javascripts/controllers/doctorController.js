app.controller('DoctorController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

  var doctorID = $routeParams.doctorid; //set this to current doctor id $scope.current_user.id

  //doctors info
  $http.get('/api/doctors/'+ doctorID)
    .success(function(data, status, headers, config) {
      $scope.doctor = data;
  })

  //doctors patients
  $http.get('/api/doctors/'+ doctorID + '/patients')
    .success(function(data, status, headers, config) {
      $scope.patients = data;
  })

  //doctor rxs
  $http.get('/api/doctors/'+ doctorID +'/rxs')
    .success(function(data, status, headers, config) {
      $scope.rxs = data;
  })

  var patientID = $routeParams.patientid;

  if (patientID) {

    $http.get('/api/doctors/'+ doctorID + '/patients/' + patientID)
      .success(function(data, status, headers, config) {
        $scope.patient = data;
    })
  }
}]);