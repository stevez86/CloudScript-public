(function() {
  var app = angular.module('CloudScript', ['ngAnimate']);

  app.controller('ChatController', ['$scope', '$http', function($scope, $http){

    $scope.messages = [{message: "I'm message one!"}, {message: "I'm message one!"}]

  }]);


  app.directive('chat', function(){
    return {
      restrict: 'E',
      templateUrl: '../partials/chat.html',
    };
  });
})();