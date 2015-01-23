(function() {
  var app = angular.module('CloudScript', ['ngAnimate']);

  app.controller('ChatController', ['$scope', '$http', function($scope, $http){

    $scope.messages = [
      {
        content: "Hey doc, I'm feeling kind of weird.",
        timestamp: "Today",
        author: {
          patient: true,
          name: "John Smith",
          avatar_url: "http://i1-news.softpedia-static.com/images/news2/Google-Chrome-18-Lands-in-the-Dev-Channel-Adds-User-Name-and-Avatar-Sync-2.png",
          prescriptions: [
            {
            name: "Advil",
            qty: 60,
            ordered: false,
            read: false
            }
          ],
          home_address: "60 Oak st.",
        }
      },
      {
        content: "I'm sorry to hear that, John. Tell me more.",
        timestamp: "Today",
        author: {
          doctor: true,
          name: "Dr. John Doe",
          avatar_url: "http://images.wisegeek.com/male-doctor.jpg"
          }
      }
    ];

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