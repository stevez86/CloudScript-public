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

app.controller('HomepageController', ['$scope', '$http', function($scope, $http) {

}]);

app.controller('LoginController', ['$scope', '$http', function($scope, $http) {

}]);

app.config(function($routeProvider) {
  $routeProvider

  // route for the home page
  .when('/', {
      templateUrl : 'partials/homepage.html',
      controller  : 'HomepageController'
  })

  // route for the about page
  .when('/login', {
      templateUrl : 'partials/login.html',
      controller  : 'LoginController'
  })

  .when('/signup', {
      templateUrl : 'partials/signup.html',
      controller  : 'SignupController'
  })

  .when('/index', {
      templateUrl : 'partials/loggedin.html'
  })
});
