(function() {
  var app = angular.module('CloudScript', ['ngAnimate', 'firebase']);

  app.factory("chatMessages", ["$firebase", function($firebase) {
       // create a reference to the Firebase where we will store our data
       var ref = new Firebase("https://luminous-heat-3537.firebaseio.com");

        // Create new FireBase object to perform tasks
        var chatDB = $firebase(ref);

        // Delete all records in the FireBase database
        chatDB.$remove();

       // this uses AngularFire to create the synchronized array
       return chatDB.$asArray();
    }
  ]);

  app.controller('ChatController', ['$scope', '$http', 'chatMessages', function($scope, $http, chatMessages) {

    // Investigate ways to remove possible race condition of adding records to Firebase before all records removed from FireBase

    $scope.messages = chatMessages

    // Pulls all records from MongoDB and adds them to Firebase for display in client browser

    $http.get("/api/messages")
      .success(function(data, status, headers, config) {
        for(var i = 0; i < data.length; i++) {
          $scope.messages.$add({content: data[i].content, timestamp: data[i].timestamp});
        };
      });

    // called by ng-submit a method to create new messages
    this.sendText = function(text) {
      // calling $add on a synchronized array is like Array.push,
      // except that it saves the changes to Firebase!
      $scope.messages.$add({content: text, timestamp: new Date()});
      $http.post('/api/messages', {content: text, timestamp: new Date()});
      $scope.text = "";
    };

  }]);

  app.directive('chat', function(){
    return {
      restrict: 'E',
      templateUrl: '../partials/chat.html',
    };
  });
})();