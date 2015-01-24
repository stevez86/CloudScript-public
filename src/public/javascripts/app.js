(function() {
  var app = angular.module('CloudScript', ['ngAnimate']);

  app.controller('ChatController', ['$scope', '$http', function($scope, $http){

    $scope.messages = [{message: "I'm message one!"}, {message: "I'm message one!"}]

  }]);

  app.controller('RxController', ['$scope', '$http', function($scope, $http){

    $scope.master = {};

    //NEED: user id and doctor id
    //$scope.user
    //$scope.doctor

    $scope.update = function(rx) {
      $scope.master = angular.copy(rx);
    };

    $scope.reset = function() {
      $scope.rx = angular.copy($scope.master);
    };

    $scope.submit = function(rx) {
      //need to get these values form the database
      rx.doctor = "#";
      rx.user = "#";

      $http.post('/orders',rx)

      $scope.new_rx_response = "RX submitted!"
    };

    $scope.reset();

  }]);


  app.directive('chat', function(){
    return {
      restrict: 'E',
      templateUrl: '../partials/chat.html',
    };
  });

  app.directive('rx', function(){
    return {
      restrict: 'E',
      templateUrl: '../partials/new_rx_form.html',
    };
  });

})();