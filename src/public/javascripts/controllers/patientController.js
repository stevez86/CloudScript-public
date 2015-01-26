app.controller('PatientDoctorsController', ['$scope', '$http', function($scope, $http) {

var patientID = "13";

console.log(patientID);

 $scope.doctors = [
  {name: "name", id: 69},
  {name: "name2", id: 70}
 ]

$http.get("/patients/" + patientID + "/doctors")
 .success(function(data, status, headers, config) {
    console.log(data);
   };
 });
 //TODO
}]);