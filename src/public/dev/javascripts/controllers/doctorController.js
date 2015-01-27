app.controller('DoctorController', ['$scope', '$http', '$routeParams', 'newScript', function($scope, $http, $routeParams, newScript) {

  var doctorID = $routeParams.doctorid; //set this to current doctor id $scope.current_user.id

  //doctors info
  $http.get('/api/doctors/'+ doctorID)
    .success(function(data, status, headers, config) {
      $scope.doctor = data;
  });

  var patientID = $routeParams.patientid;

  //doctors patients
  // $http.get('/api/doctors/'+ doctorID + '/patients')
  //   .success(function(data, status, headers, config) {
  //     $scope.patients = data;
  // })

  // //doctor rxs
  // $http.get('/api/doctors/'+ doctorID +'/rxs')
  //   .success(function(data, status, headers, config) {
  //     $scope.rxs = data;
  // });

  this.submitNewRx = function(newRX) {
    //submit rx

    newRX.patientID = patientID;
    newRX.doctorID = doctorID;

    newScript.newOrder(newRX);

    console.log(newRX);
    console.log("RX SENT");

    $scope.sysMessages = "New Prescription Sent";
    $scope.showNewRxForm = false;
    // newScript.script.prescriptions;


    // $http.post('/api/orders/', newRX)
    //   .done(function(data, status, headers, config) {
    //
    //     $scope.showNewRxForm = false;
    //     console.log("RX SENT!");
    // })
  };


  // if (patientID) {

  //   $http.get('/api/doctors/'+ doctorID + '/patients/' + patientID)
  //     .success(function(data, status, headers, config) {
  //       $scope.patient = data;
  //   })
  // }

}]);