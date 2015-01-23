(function() {
  var app = angular.module('CloudScript', ['ngAnimate', 'firebase']);

  app.factory("chatMessages", ["$firebase", function($firebase) {
       // create a reference to the Firebase where we will store our data
       var ref = new Firebase("https://luminous-heat-3537.firebaseio.com");

       // this uses AngularFire to create the synchronized array
       return $firebase(ref).$asArray();
    }
  ]);

  app.controller('ChatController', ['$scope', '$http', 'chatMessages', function($scope, $http, chatMessages) {

    $scope.user = "Guest " + Math.round(Math.random()*101);

    // we add chatMessages array to the scope for our ng-repeat
    $scope.messages = chatMessages;

    // called by ng-submit a method to create new messages
    this.sendText = function(text) {
      // calling $add on a synchronized array is like Array.push,
      // except that it saves the changes to Firebase!
      $scope.messages.$add({from: $scope.user, content: text});
      $scope.text = "";
    };

    // $scope.messages = $firebase(ref)

    // $http.get("/api/messages")
    //   .success(function(data, status, headers, config) {
    //     for (var i = 0; i < data.length; i++) {
    //       $scope.messages.$add({content: data[i].content, author: data[i].author, timestamp: data[i].timestamp}).$asArray;
    //     }
    //   });

    // this.sendText = function(text) {
    //   $http.post('/api/messages', {content: text});
    //   $scope.messages.$push({content: text});
    //   $scope.text = "";
    // }

  }]);

  app.directive('chat', function(){
    return {
      restrict: 'E',
      templateUrl: '../partials/chat.html',
    };
  });
})();