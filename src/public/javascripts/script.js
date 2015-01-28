app.service('newScript', ['$http', '$firebase', function($http, $firebase) {
  var self = this;
  var ref = new Firebase("https://luminous-heat-3537.firebaseio.com");
  var sync = $firebase(ref);
  this.script = sync.$asObject();
  self.script.prescriptions = false;

  this.updateUserPrescriptions = function(manifest) {
    // $http.post("LINK TO MONGODB", {INFO ABOUT SCRIPT & USER})
  };

  this.newOrder = function(rx) {

      $http.post('api/orders', rx)
      .success(function(data, status, headers, config) {
        self.orderData = data;

        self.script.prescriptions = true;
        self.script.$save().then(function(ref) {}, function(error) {});
        console.log(self.script);
        // var obj = $firebase(ref).$asObject();
        // obj.prescriptions = "true";
        // obj.$save().then(function(ref) {
        //   ref.key() === obj.$id; // true
        // }, function(error) {
        //   console.log("Error:", error);
        // });
      });
  };

  this.orderScript = function() {
    console.log("Script ordered!");
    // PLACE ORDER WITH POSTMATES
  };

}]);
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider

    .when('/', {
        templateUrl : 'views/homepage.html'
    })

    .when('/login', {
        templateUrl : 'views/login.html',
        controller  : 'loginController'
    })

    .when('/signup', {
        templateUrl : 'views/signup.html',
        controller  : 'registerController'
    })

    .when('/d/:doctorid/', {
        templateUrl : 'views/doctor/home.html',
        controller  : 'DoctorController'
    })

    .when('/d/:doctorid/patients/:patientid', {
        templateUrl : 'views/doctor/patient.html',
        controller  : 'DoctorController'
    })

    .when('/d/:doctorid/profile', {
        templateUrl : 'views/doctor/profile.html',
        controller  : 'DoctorController'
    })

    .when('/p/:patientid/', {
        templateUrl : 'views/patient/home.html',
        controller  : 'PatientController'
    })

    .when('/p/:patientid/orders/:orderid', {
        templateUrl : 'views/patient/order.html',
        controller  : 'PatientController'
    })

    .when('/p/:patientid/doctors/:doctorid', {
        templateUrl : 'views/patient/doctor.html',
        controller  : 'PatientController'
    })

    .when('/p/:patientid/profile', {
        templateUrl : 'views/patient/profile.html',
        controller  : 'PatientController'
    })

    .when('/p/:patientid/prescriptions/:prescriptionIndex', {
        templateUrl : 'views/patient/prescription.html',
        controller  : 'PatientController'
    });

}]);

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
app.factory("doctor", ["$http", function($http) {

  return {
    getPatients: function(doctorID) {
      $http.get('/api/doctors/'+ doctorID + '/patients')
        .success(function(data, status, headers, config) {
          return data;
      });
    }
  };

}]);
app.factory("patient", ["$http", function($http) {

  return {
    getDoctors: function(patientID) {
      $http.get('/api/patients/'+ patientID + '/doctors')
        .success(function(data, status, headers, config) {
          return data;
      });
    }
  };

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

app.directive('dprxns', function(){
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

app.directive('rx', function(){
  return {
    restrict: 'E',
    templateUrl: '../partials/patient/prescriptionView.html'
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

app.directive('newscript', function(){
  return {
    restrict: 'E',
    templateUrl: '../partials/patient/new_rx_popup.html',
  };
});

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

    $scope.new_rx_response = "RX submitted!";
  };

  $scope.reset();

}]);
app.controller('ChatController', ['$scope', '$http', 'chatMessages', function($scope, $http, chatMessages) {

  // Investigate ways to remove possible race condition of adding records to Firebase before all records removed from FireBase

  $scope.messages = chatMessages;

  // Pulls all records from MongoDB and adds them to Firebase for display in client browser

  $http.get("/api/messages")
    .success(function(data, status, headers, config) {
      for(var i = 0; i < data.length; i++) {
        $scope.messages.$add({content: data[i].content, timestamp: data[i].timestamp});
      }
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


app.controller('DoctorController', ['$scope', '$http', '$routeParams', 'newScript', function($scope, $http, $routeParams, newScript) {

  var doctorID = $routeParams.doctorid; //set this to current doctor id $scope.current_user.id
  console.log($routeParams);

  //doctors info
  $http.get('/api/doctors/'+ doctorID)
    .success(function(data, status, headers, config) {
      $scope.doctor = data;
  });

  var patientID = $routeParams.patientid;

  //doctors patients
  // $http.get('/api/doctors/'+ doctorID + '/patients')
  //   .success(function(data, status, headers, config) {
  //     $scope.patients = data;
  // })

  // //doctor rxs
  // $http.get('/api/doctors/'+ doctorID +'/rxs')
  //   .success(function(data, status, headers, config) {
  //     $scope.rxs = data;
  // });

  this.submitNewRx = function(newRX) {
    //submit rx

    newRX.patientID = patientID;
    newRX.doctorID = doctorID;

    $http.post("/api/patients/prescription", newRX)
      .success(function(data, headers) {
        newScript.script.prescriptions = true;
        newScript.script.$save();
        console.log(newScript);
        $scope.showNewRxForm = !newScript.script.prescriptions;
      });

    $scope.sysMessages = "New Prescription Sent";
    $scope.showNewRxForm = !newScript.script.prescriptions;
    // newScript.script.prescriptions;


    // $http.post('/api/orders/', newRX)
    //   .done(function(data, status, headers, config) {
    //
    //     $scope.showNewRxForm = false;
    //     console.log("RX SENT!");
    // })
  };


  // if (patientID) {

  //   $http.get('/api/doctors/'+ doctorID + '/patients/' + patientID)
  //     .success(function(data, status, headers, config) {
  //       $scope.patient = data;
  //   })
  // }

}]);
app.controller('loginController', ['$location', '$scope', '$cookies', '$http', function($location, $scope, $cookies, $http){
  var ref = new Firebase("https://luminous-heat-3537.firebaseio.com");

  $scope.submit = function(credentials){

    ref.authWithPassword({
      email: $scope.credentials.username,
      password: $scope.credentials.password
    }, function(error, authData) {
      if (error) { console.log("Error", error); }
      else {
        $cookies.id = authData.uid;
        $http({ method: "GET",
                url: "/api/login",
                params: {id: $cookies.id}
              })
        .success(function(data) {
          if (data.userType === "doctor") {
            $location.path('/d/' + data.userId);
          } else if (data.userType === "patient") {
            $location.path('/p/' + data.userId);
          } else { console.log("Error!"); }
        });
      }
    });
  };
}]);

app.controller('newRxFormController', ['$scope', '$http', '$firebase', 'newScript', function($scope, $http, $firebase, newScript){

  $scope.master = {};

  //NEED: user id and doctor id
  //$scope.user
  //$scope.doctor

  $scope.update = function(rx) {
    // $scope.master = angular.copy(rx);
  };

  $scope.reset = function() {
    $scope.rx = angular.copy($scope.master);
  };

  $scope.submit = function(rx) {
    //need to get these values form the database
    // rx.doctor = "#";
    // rx.user = "#";

    newScript.updateUserPrescriptions(rx);
    newScript.newOrder(rx);

    $scope.new_rx_response = "RX submitted!";
  };

  $scope.reset();

}]);
app.controller('newScriptController', ['$scope', '$http', 'newScript', function($scope, $http, newScript) {
  $scope.newScript = newScript;
}]);
app.controller('PatientController', ['$scope', '$http', '$routeParams', 'newScript', function($scope, $http, $routeParams, newScript) {

  var patientID = $routeParams.patientid; //set this to current patient id $scope.current_user.id

  $scope.newScript = newScript;

  //patients info
  $http.get('/api/patients/'+ patientID)
    .success(function(data, status, headers, config) {
      $scope.patient = data;
      $scope.newScript.script.prescriptions = true;
      $scope.prescriptions = data.prescriptions;
      $scope.prescriptionIndex = $routeParams.prescriptionIndex;
  });

  $scope.getPrescriptionPage = function() {

  };

  // //patients doctors
  // $http.get('/api/patients/'+ patientID + '/doctors')
  //   .success(function(data, status, headers, config) {
  //     $scope.doctors = data;
  // })

  // //patient rxs
  // $http.get('/api/patients/'+ patientID +'/rxs')
  //   .success(function(data, status, headers, config) {
  //     $scope.rxs = data;
  // })

  var doctorID = $routeParams.doctorid;

  // if (doctorID) {

  //   $http.get('/api/patients/'+ patientID + '/doctors/' + doctorID)
  //     .success(function(data, status, headers, config) {
  //       $scope.doctor = data;
  //   });
  // }
}]);
app.controller('registerController', ['$scope', '$location', '$http', '$cookies', function($scope, $cookies, $location, $http) {
  var ref = new Firebase("https://luminous-heat-3537.firebaseio.com");

  $scope.submit = function(credentials){

    var logPass = {email: $scope.credentials.username, password : $scope.credentials.password};

    ref.createUser(logPass, function(error) {

      if (error === null) {
        ref.authWithPassword(logPass, function(error, authData) {
          if (error) { console.log("Error", error); }
          $http({ method: "POST",
            url: "/api/users",
            params: {address:        $scope.credentials.address,
              name:           $scope.credentials.name,
              firebase_id:    authData.uid,
              avatar_url:     $scope.credentials.avatar_url,
              email:          $scope.credentials.email,
              doctor:         $scope.credentials.doctor,
              patient:        $scope.credentials.patient,
              prescriptions:  []
            }
          })
          .success(function(data) {
            $cookies.id = data.firebase_id;
            $http({
                    method: "GET",
                    url: "/api/login",
                    data: {id: $cookies.id}
                  })
            .success(function(data) {
              if (data.userType === "doctor") {
                $location.path('/d/' + data.userId);
              } else if (data.userType === "patient") {
                $location.path('/p/' + data.userId);
              } else { console.log("Error!"); }
            });
          });
        });
      } else { console.log("Error creating user:", error); }
    });
  };
}]);
