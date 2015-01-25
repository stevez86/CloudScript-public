(function() {
  var app = angular.module('CloudScript', ['ngAnimate', 'firebase']);

  app.factory("chatMessages", ["$firebase", function($firebase) {
       // create a reference to the Firebase where we will store our data
       var ref = new Firebase("https://luminous-heat-3537.firebaseio.com");

        // Create new FireBase object to perform tasks
        var FirebaseDB = $firebase(ref);

        // Delete all records in the FireBase database
        FirebaseDB.$remove();

        FirebaseDB.$set("prescriptions", false);

       // this uses AngularFire to create the synchronized array
       return FirebaseDB.$asArray();
    }
  ]);

   app.controller('RxController', ['$scope', '$http', '$firebase', 'newScript', function($scope, $http, $firebase, newScript){

      $scope.master = {};

      //NEED: user id and doctor id
      //$scope.user
      //$scope.doctor

      $scope.update = function(rx) {
        // $scope.master = angular.copy(rx);
      };

      $scope.reset = function() {
        // $scope.rx = angular.copy($scope.master);
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

  app.service('newScript', ['$http', '$firebase', function($http, $firebase) {
    var self = this;
    var ref = new Firebase("https://luminous-heat-3537.firebaseio.com");
    var sync = $firebase(ref);
    this.script = sync.$asObject();

    this.updateUserPrescriptions = function(manifest) {
      // $http.post("LINK TO MONGODB", {INFO ABOUT SCRIPT & USER})
    };

    this.newOrder = function(rx) {

        $http.post('/orders', rx)
        .success(function(data, status, headers, config) {
          self.orderData = data;

          self.script["prescriptions"] = true;
          self.script.$save().then(function(ref) {}, function(error) {});
          console.log(self.script)
          // var obj = $firebase(ref).$asObject();
          // obj.prescriptions = "true";
          // obj.$save().then(function(ref) {
          //   ref.key() === obj.$id; // true
          // }, function(error) {
          //   console.log("Error:", error);
          // });
        });
    }

    this.orderScript = function() {
      console.log("Script ordered!")
      // PLACE ORDER WITH POSTMATES
    }

  }])

  app.controller('newScriptController', ['$scope', '$http', 'newScript', function($scope, $http, newScript) {
    $scope.newScript = newScript
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

    app.directive('newscript', function(){
    return {
      restrict: 'E',
      templateUrl: '../partials/newscript.html',
    };
  });

})();