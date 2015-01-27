app.controller('DoctorController', ['$scope', '$http', 'doctor', function($scope, $http, doctor) {

  var doctorID = 17; //set this to current doctor id $scope.current_user.id

  //make this into factory
  $http.get('/api/doctors/'+ doctorID)
    .success(function(data, status, headers, config) {
      // console.log(data);
      $scope.doctor = data;
  })
}]);