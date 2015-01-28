app.controller('newRxFormController', ['$scope', '$http', '$firebase', 'newScript', function($scope, $http, $firebase, newScript){

  $scope.master = {};

  //NEED: user id and doctor id
  //$scope.user
  //$scope.doctor

  $scope.update = function(rx) {
    // $scope.master = angular.copy(rx);
  };

  $scope.reset = function() {
    $scope.rx = angular.copy($scope.master);
  };

  $scope.submit = function(rx) {
    //need to get these values form the database
    // rx.doctor = "#";
    // rx.user = "#";

    newScript.updateUserPrescriptions(rx);
    newScript.newOrder(rx);

    $scope.new_rx_response = "RX submitted!"
  };

  $scope.reset();

}]);