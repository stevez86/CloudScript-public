(function() {
  var app = angular.module('CloudScript', ['ngAnimate']);

  app.controller('ChatController', ['$scope', '$http', function($scope, $http){

    $http.get("/api/messages")
      .success(function(data, status, headers, config) {
        $scope.messages = data;
      });

    this.sendText = function(text) {
      $scope.text = "";
      $scope.messages.push({content: text})
    }

  }]);


  app.directive('chat', function(){
    return {
      restrict: 'E',
      templateUrl: '../partials/chat.html',
    };
  });
})();