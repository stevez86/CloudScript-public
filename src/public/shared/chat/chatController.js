app.controller('ChatController', ['$cookies', '$scope', '$route', '$routeParams', '$http', 'chatMessages', function($cookies, $scope, $route, $routeParams, $http, chatMessages) {

  $scope.messages = chatMessages;

  // Pulls all records from MongoDB and adds them to Firebase for display in client browser

  $http.get("/api/messages?recipient=" + $routeParams.userid + '&sender=' + $cookies.id)
    .success(function(conversation) {
      for (var i = 0; i < conversation.messages.length; i++) {
        $scope.messages.$add(conversation.messages[i])
      };
    });

  // called by ng-submit a method to create new messages
  this.sendText = function(text) {
    // calling $add on a synchronized array is like Array.push,
    // except that it saves the changes to Firebase!
    $scope.messages.$add({content: text, timestamp: new Date()});
    $http.post("/api/messages?recipient=" + $routeParams.userid + '&sender=' + $cookies.id, {content: text, timestamp: new Date()});
    $scope.text = "";
  };

}]);

