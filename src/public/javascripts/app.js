(function() {
  var app = angular.module('CloudScript', ['ngAnimate', 'firebase', 'ngRoute']);

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

  app.directive('newrxform', function(){
    return {
      restrict: 'E',
      templateUrl: '../partials/doctor/new_rx_form.html',
    };
  });

  app.directive('newrxpop', function(){
    return {
      restrict: 'E',
      templateUrl: '../partials/patient/new_rx_popup.html',
    };
  });

  app.directive('dprxs', function(){
    return {
      restrict: 'E',
      templateUrl: '../partials/doctor/p_rxs.html',
    };
  });

  app.directive('prxns', function(){
    return {
      restrict: 'E',
      templateUrl: '../partials/patient/p_rxs.html',
    };
  });

  app.directive('pmenu', function(){
    return {
      restrict: 'E',
      templateUrl: '../partials/patient/menu.html',
    };
  });

  app.directive('dmenu', function(){
    return {
      restrict: 'E',
      templateUrl: '../partials/doctor/menu.html',
    };
  });

  app.directive('patients', function(){
    return {
      restrict: 'E',
      templateUrl: '../partials/doctor/patients.html',
    };
  });

  app.directive('patient', function(){
    return {
      restrict: 'E',
      templateUrl: '../partials/doctor/patient.html',
    };
  });

  app.directive('doctors', function(){
    return {
      restrict: 'E',
      templateUrl: '../partials/patient/doctors.html',
    };
  });

  app.directive('doctor', function(){
    return {
      restrict: 'E',
      templateUrl: '../partials/patient/doctor.html',
    };
  });

  app.directive('prxs', function(){
    return {
      restrict: 'E',
      templateUrl: '../partials/patient/p_rxs.html',
    };
  });

  app.directive('neworder', function(){
    return {
      restrict: 'E',
      templateUrl: '../partials/patient/new_order.html',
    };
  });

  app.directive('missedmessages', function(){
    return {
      restrict: 'E',
      templateUrl: '../partials/missed_messages.html',
    };
  });

  app.directive('pprofile', function(){
    return {
      restrict: 'E',
      templateUrl: '../partials/patient/profile.html',
    };
  });

  app.directive('dprofile', function(){
    return {
      restrict: 'E',
      templateUrl: '../partials/doctor/profile.html',
    };
  });

  app.controller('HomepageController', ['$scope', '$http', function($scope, $http) {

  }]);

  app.controller('LoginController', ['$scope', '$http', function($scope, $http) {

  }]);

  app.config(function($routeProvider) {
    $routeProvider
    // route for the home page
    .when('/', {
        templateUrl : 'views/homepage.html',
        controller  : 'HomepageController'
    })

    .when('/login', {
        templateUrl : 'views/login.html',
        controller  : 'LoginController'
    })

    .when('/signup', {
        templateUrl : 'views/signup.html',
        controller  : 'SignupController'
    })

    .when('/d', {
        templateUrl : 'views/doctor/home.html'
    })

    .when('/d/patients', {
        templateUrl : 'views/doctor/patient.html'
    })

    .when('/d/profile', {
        templateUrl : 'views/doctor/profile.html'
    })

    .when('/p', {
        templateUrl : 'views/patient/home.html'
    })

    .when('/p/orders/new', {
        templateUrl : 'views/patient/new_order.html'
    })

    .when('/p/doctors', {
        templateUrl : 'views/patient/doctor.html'
    })

    .when('/p/profile', {
        templateUrl : 'views/patient/profile.html'
    })
  });

})();

