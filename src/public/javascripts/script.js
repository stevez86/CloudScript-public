<<<<<<< HEAD
app.service('newScript', ['$http', '$firebase', function($http, $firebase) {
  var self = this;
  var ref = new Firebase("https://luminous-heat-3537.firebaseio.com");
  var sync = $firebase(ref);
  this.script = sync.$asObject();

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
        templateUrl : 'views/doctor/home.html'
    })

    .when('/d/:doctorid/patients/:patientid', {
        templateUrl : 'views/doctor/patient.html'
    })

    .when('/d/:doctorid/profile', {
        templateUrl : 'views/doctor/profile.html'
    })

    .when('/p/:patientid/', {
        templateUrl : 'views/patient/home.html'
    })

    .when('/p/:patientid/orders/new', {
        templateUrl : 'views/patient/new_order.html'
    })

    .when('/p/:patientid/doctors/:doctorid', {
        templateUrl : 'views/patient/doctor.html'
    })

    .when('/p/:patientid/profile', {
        templateUrl : 'views/patient/profile.html'

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
      })
    }
  };

}]);
app.factory("patient", ["$http", function($http) {

  return {
    getDoctors: function(patientID) {
      $http.get('/api/patients/'+ patientID + '/doctors')
        .success(function(data, status, headers, config) {
          return data;
      })
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

// app.directive('newscript', function(){
//   return {
//     restrict: 'E',
//     templateUrl: '../partials/newscript.html',
//   };
// });
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

  //doctors info
  $http.get('/api/doctors/'+ doctorID)
    .success(function(data, status, headers, config) {
      $scope.doctor = data;
  })

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
  // })

  this.submitNewRx = function(newRX) {
    //submit rx

    newRX.patientID = patientID;
    newRX.doctorID = doctorID;

    newScript.newOrder(newRX);

    console.log(newRX);
    console.log("RX SENT");

    $scope.sysMessages = "New Prescription Sent";
    $scope.showNewRxForm = false;
    // newScript.script.prescriptions;


    // $http.post('/api/orders/', newRX)
    //   .done(function(data, status, headers, config) {
    //
    //     $scope.showNewRxForm = false;
    //     console.log("RX SENT!");
    // })
  };

  $scope.drugnames = [
    "Alternagel",
    "Tums, Tums Extra Strength, Tums Ultra",
    "Mylanta, Rolaids",
    "Pepcid AC",
    "Pepcid Complete",
    "Prevacid OTC",
    "Maalox, Maalox Plus, Mylanta",
    "Prilosec OTC",
    "Zantac",
    "Pepto-Bismol, Kaopectate",
    "Imodium A-D",
    "Imodium Advanced",
    "Dulcolax",
    "Fiber-lax",
    "Unifiber",
    "Colace, Dok",
    "Surfak",
    "Fleet Suppositories",
    "Benefiber",
    "Citroma",
    "Phillip’s Milk of Magnesia",
    "Mag OX",
    "Fiber Clear",
    "Citrucel, Citrucel SF",
    "Fleet Mineral Oil Enema",
    "Miralax",
    "Fleet Phospho-soda/Fleet enema",
    "Metamucil",
    "Senokot",
    "Senokot - S",
    "Derifil",
    "Lactaid",
    "Gas-X, Mylicon, Phazyme",
    "Thick It, Thick It - II",
    "Debrox, Murine Ear Wax Removal Kit",
    "Murine Earigate",
    "Star-Otic",
    "Zaditor OTC, Alaway",
    "Naphcon",
    "Naphcon-A",
    "Murine Plus",
    "Visine Allergy",
    "Liquitears",
    "LacriLube SOP",
    "Artificial Tears, Tears Naturale, Murine",
    "Tears Naturale Ointment",
    "Muro-128",
    "Ocuvite Preservision",
    "Ocuvite with Lutein",
    "Ocuvite",
    "Nasalcrom",
    "Afrin",
    "Little Noses, Vicks Sinex",
    "Neo-Synephrine II",
    "Moi-stir, Salivart, Saliva Substitute,",
    "Oasis Spray, Glandosane",
    "Gly-Oxide",
    "Abreva",
    "Peroxyl Oral Cleanser",
    "Phos-flur",
    "Gel-Kam",
    "Tylenol",
    "Tylenol Arthritis",
    "Excedrin",
    "Bayer, St. Joseph’s",
    "Ascriptin",
    "Bufferin",
    "Ecotrin",
    "Motrin IB",
    "Ibuprofen",
    "Advil",
    "Aleve",
    "Zyrtec",
    "Zyrtec D",
    "Chlor-Trimeton",
    "Tavist",
    "Benadryl",
    "Claritin OTC, Alavert",
    "Claritin-D OTC, Alavert-D",
    "Sudafed PE",
    "Tylenol Sinus Congestion",
    "Dristan Cold",
    "Dimetapp",
    "Sudafed",
    "Tussin Max Strength",
    "Coricidine HBP",
    "Little Colds",
    "Tylenol Cold",
    "Tylenol Cold, Triaminic, Comtrex",
    "Dimetapp DM",
    "Triaminic Cough & Cold",
    "Robitussin",
    "Mucinex",
    "Robitussin DM",
    "Robitussin CF",
    "Mucinex D",
    "Robitussin PE, Triaminic",
    "Bronchosaline",
    "PanOxyl, Clearasil",
    "OxyClean,Noxzema Anti-Acne",
    "Polysporin, Double Antibiotic",
    "Lotrimin Ultra",
    "Lotrimin AF, Desenex",
    "Nizoral A-D",
    "Monistat Derm, Micatin, Microguard",
    "Neosporin Plus",
    "Neosporin, Triple Antibiotic",
    "Lamisil AT",
    "Lamisil AT Spray",
    "Tinactin",
    "Caladryl, Calamine",
    "Cortizone, Cortaid, Scalpacin",
    "Benadryl Topical",
    "Itch Relief",
    "Amlactin AP",
    "Caladryl",
    "Caladryl Clear",
    "Amlactin, Lac-Hydrin",
    "Carmol 10, Carmol 20",
    "Vaseline",
    "Nix",
    "Rid Complete",
    "Rid",
    "Capzasin-P, Zostrix",
    "Lavacol",
    "Rubbing Alcohol",
    "Betadine",
    "Duofilm, Duoplant, Compound W, Mediplast",
    "Caltrate, Os-Cal",
    "Caltrate-D",
    "Vi-Active",
    "Caltrate-600 Plus, Os-Cal Ultra",
    "Citracal",
    "Citracal-D",
    "Calcionate",
    "Ferretts",
    "Ferro-DSS",
    "Feosol, Fer-in-sol",
    "Niferex-150, Ferex-150",
    "Magnacaps",
    "Slow Mag",
    "Magonate",
    "Uromag",
    "Salt Tabs",
    "Neutra-Phos",
    "Neutra-Phos-K",
    "Orazinc, Zinc 220",
    "Centrum Children’s, Flintstone",
    "Poly-Vi-Flor",
    "Centrum, Certagen, Century Vits",
    "One-A-Day Iron",
    "Centrum Silver, Certagen Senior",
    "Stuartnatal (OTC)",
    "Theragram-M, Hexavitamins",
    "Vitron-C",
    "Slo-Niacin",
    "Plan B, Next Choice",
    "Gyne-Lotrimin-3, Gyne-Lotrimin-7,",
    "Mycelex-7",
    "Monistat-3, Monistat-7",
    "Vagistat-1",
    "Dramamine",
    "Glutose, Insta-Glucose",
    "Dramamine II, Bonine",
    "Actidose-Aqua, Insta-char",
    "prenatal multivitamins",
    "therapeutic multivitamins",
    "ascorbic acid (vitamin C)",
    "ascorbic acid/ferrous fumarate",
    "cholecalciferol (vitamin D3)",
    "cyanocobalamin (vitamin B-12)",
    "folic acid",
    "ergocalciferol (vitamin D2)",
    "niacin (immediate & extended-release)",
    "niacinamide",
    "pantothenic acid",
    "pyridoxine (vitamin B-6)",
    "riboflavin (vitamin B-2)",
    "thiamine (vitamin B-1)",
    "vitamin E"
  ];

  $scope.addItem = function(item) {
    $scope.item = {};
  }

}]);
app.controller('loginController', ['$location', '$scope', '$cookies', '$http', function($location, $scope, $cookies, $http){
  var ref = new Firebase("https://luminous-heat-3537.firebaseio.com");

  $scope.submit = function(credentials){

    ref.authWithPassword({
      email: $scope.credentials.username,
      password: $scope.credentials.password
    }, function(error, authData) {
      if (error) { console.log("Error", error) }
      else {
        $cookies.id = authData.uid
        $http({ method: "GET",
                url: "/api/login",
                params: {id: $cookies.id}
              })
        .success(function(data) {
          if (data.userType === "doctor") {
            $location.path('/d/' + data.userId)
          } else if (data.userType === "patient") {
            $location.path('/p/' + data.userId)
          } else { console.log("Error!") };
        });
      }
    })
  }
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

    $scope.new_rx_response = "RX submitted!"
  };

  $scope.reset();

}]);
app.controller('newScriptController', ['$scope', '$http', 'newScript', function($scope, $http, newScript) {
  $scope.newScript = newScript;
}]);
app.controller('PatientController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

  var patientID = $routeParams.patientid; //set this to current patient id $scope.current_user.id

  //patients info
  $http.get('/api/patients/'+ patientID)
    .success(function(data, status, headers, config) {
      console.log(data);
      $scope.patient = data;
  })

  //patients doctors
  $http.get('/api/patients/'+ patientID + '/doctors')
    .success(function(data, status, headers, config) {
      $scope.doctors = data;
  })

  //patient rxs
  $http.get('/api/patients/'+ patientID +'/rxs')
    .success(function(data, status, headers, config) {
      $scope.rxs = data;
  })

  var doctorID = $routeParams.doctorid;

  if (doctorID) {

    $http.get('/api/patients/'+ patientID + '/doctors/' + doctorID)
      .success(function(data, status, headers, config) {
        $scope.doctor = data;
    })
  }
}]);
app.controller('registerController', ['$scope', '$location', '$http', '$cookies', function($scope, $cookies, $location, $http) {
  var ref = new Firebase("https://luminous-heat-3537.firebaseio.com");

  $scope.submit = function(credentials){

    var logPass = {email: $scope.credentials.username, password : $scope.credentials.password }

    ref.createUser(logPass, function(error) {

      if (error === null) {
        ref.authWithPassword(logPass, function(error, authData) {
          if (error) { console.log("Error", error) };
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
            $cookies.id = data.firebase_id
            $http({
                    method: "GET",
                    url: "/api/login",
                    data: {id: $cookies.id}
                  })
            .success(function(data) {
              if (data.userType === "doctor") {
                $location.path('/d/' + data.userId)
              } else if (data.userType === "patient") {
                $location.path('/p/' + data.userId)
              } else { console.log("Error!") };
            });
          });
        });
      } else { console.log("Error creating user:", error) };
    });
  };
}]);
=======
<<<<<<< HEAD
app.service("newScript",["$http","$firebase",function(t,e){var r=this,i=new Firebase("https://luminous-heat-3537.firebaseio.com"),n=e(i);this.script=n.$asObject(),this.updateUserPrescriptions=function(){},this.newOrder=function(e){t.post("/orders",e).success(function(t){r.orderData=t,r.script.prescriptions=!0,r.script.$save().then(function(){},function(){})})},this.orderScript=function(){}}]),app.config(["$routeProvider",function(t){t.when("/",{templateUrl:"views/homepage.html"}).when("/login",{templateUrl:"views/login.html",controller:"loginController"}).when("/signup",{templateUrl:"views/signup.html",controller:"registerController"}).when("/d/:doctorid/",{templateUrl:"views/doctor/home.html"}).when("/d/:doctorid/patients/:patientid",{templateUrl:"views/doctor/patient.html"}).when("/d/:doctorid/profile",{templateUrl:"views/doctor/profile.html"}).when("/p/:patientid/",{templateUrl:"views/patient/home.html"}).when("/p/:patientid/orders/new",{templateUrl:"views/patient/new_order.html"}).when("/p/:patientid/doctors/:doctorid",{templateUrl:"views/patient/doctor.html"}).when("/p/:patientid/profile",{templateUrl:"views/patient/profile.html"})}]),app.factory("chatMessages",["$firebase",function(t){var e=new Firebase("https://luminous-heat-3537.firebaseio.com"),r=t(e);return r.$remove(),r.$set("prescriptions",!1),r.$asArray()}]),app.factory("doctor",["$http",function(t){return{getPatients:function(e){t.get("/api/doctors/"+e+"/patients").success(function(t){return t})}}}]),app.factory("patient",["$http",function(t){return{getDoctors:function(e){t.get("/api/patients/"+e+"/doctors").success(function(t){return t})}}}]),app.directive("chat",function(){return{restrict:"E",templateUrl:"../partials/chat.html"}}),app.directive("newrxform",function(){return{restrict:"E",templateUrl:"../partials/doctor/new_rx_form.html"}}),app.directive("newrxpop",function(){return{restrict:"E",templateUrl:"../partials/patient/new_rx_popup.html"}}),app.directive("dprxns",function(){return{restrict:"E",templateUrl:"../partials/doctor/p_rxs.html"}}),app.directive("prxns",function(){return{restrict:"E",templateUrl:"../partials/patient/p_rxs.html"}}),app.directive("pmenu",function(){return{restrict:"E",templateUrl:"../partials/patient/menu.html"}}),app.directive("dmenu",function(){return{restrict:"E",templateUrl:"../partials/doctor/menu.html"}}),app.directive("patients",function(){return{restrict:"E",templateUrl:"../partials/doctor/patients.html"}}),app.directive("patient",function(){return{restrict:"E",templateUrl:"../partials/doctor/patient.html"}}),app.directive("doctors",function(){return{restrict:"E",templateUrl:"../partials/patient/doctors.html"}}),app.directive("doctor",function(){return{restrict:"E",templateUrl:"../partials/patient/doctor.html"}}),app.directive("prxs",function(){return{restrict:"E",templateUrl:"../partials/patient/p_rxs.html"}}),app.directive("neworder",function(){return{restrict:"E",templateUrl:"../partials/patient/new_order.html"}}),app.directive("missedmessages",function(){return{restrict:"E",templateUrl:"../partials/missed_messages.html"}}),app.directive("pprofile",function(){return{restrict:"E",templateUrl:"../partials/patient/profile.html"}}),app.directive("dprofile",function(){return{restrict:"E",templateUrl:"../partials/doctor/profile.html"}}),app.controller("RxController",["$scope","$http","$firebase","newScript",function(t,e,r,i){t.master={},t.update=function(){},t.reset=function(){},t.submit=function(e){i.updateUserPrescriptions(e),i.newOrder(e),t.new_rx_response="RX submitted!"},t.reset()}]),app.controller("ChatController",["$scope","$http","chatMessages",function(t,e,r){t.messages=r,e.get("/api/messages").success(function(e){for(var r=0;r<e.length;r++)t.messages.$add({content:e[r].content,timestamp:e[r].timestamp})}),this.sendText=function(r){t.messages.$add({content:r,timestamp:new Date}),e.post("/api/messages",{content:r,timestamp:new Date}),t.text=""}}]),app.controller("DoctorController",["$scope","$http","$routeParams",function(t,e,r){var i=r.doctorid;e.get("/api/doctors/"+i).success(function(e){t.doctor=e});var n=r.patientid;n&&e.get("/api/doctors/"+i+"/patients/"+n).success(function(e){t.patient=e})}]),app.controller("loginController",["$location","$scope","$cookies","$http",function(t,e,r,i){var n=new Firebase("https://luminous-heat-3537.firebaseio.com");e.submit=function(){n.authWithPassword({email:e.credentials.username,password:e.credentials.password},function(e,n){e||(r.id=n.uid,i({method:"GET",url:"/api/login",params:{id:r.id}}).success(function(e){"doctor"===e.userType?t.path("/d/"+e.userId):"patient"===e.userType&&t.path("/p/"+e.userId)}))})}}]),app.controller("newRxFormController",["$scope","$http","$firebase","newScript",function(t,e,r,i){t.master={},t.update=function(){},t.reset=function(){},t.submit=function(e){i.updateUserPrescriptions(e),i.newOrder(e),t.new_rx_response="RX submitted!"},t.reset()}]),app.controller("newScriptController",["$scope","$http","newScript",function(t,e,r){t.newScript=r}]),app.controller("PatientController",["$scope","$http","$routeParams",function(t,e,r){var i=r.patientid;e.get("/api/patients/"+i).success(function(e){t.patient=e});var n=r.doctorid;n&&e.get("/api/patients/"+i+"/doctors/"+n).success(function(e){t.doctor=e})}]),app.controller("registerController",["$scope","$location","$http","$cookies",function(t,e,r,i){var n=new Firebase("https://luminous-heat-3537.firebaseio.com");t.submit=function(){var s={email:t.credentials.username,password:t.credentials.password};n.createUser(s,function(o){null===o&&n.authWithPassword(s,function(n,s){i({method:"POST",url:"/api/users",params:{address:t.credentials.address,name:t.credentials.name,firebase_id:s.uid,avatar_url:t.credentials.avatar_url,email:t.credentials.email,doctor:t.credentials.doctor,patient:t.credentials.patient,prescriptions:[]}}).success(function(t){e.id=t.firebase_id,i({method:"GET",url:"/api/login",data:{id:e.id}}).success(function(t){"doctor"===t.userType?r.path("/d/"+t.userId):"patient"===t.userType&&r.path("/p/"+t.userId)})})})})}}]);
=======
app.service("newScript",["$http","$firebase",function(t,e){var r=this,i=new Firebase("https://luminous-heat-3537.firebaseio.com"),n=e(i);this.script=n.$asObject(),this.updateUserPrescriptions=function(){},this.newOrder=function(e){t.post("api/orders",e).success(function(t){r.orderData=t,r.script.rxPopup=!0,r.script.$save().then(function(){},function(){})})},this.orderScript=function(){}}]),app.config(["$routeProvider",function(t){t.when("/",{templateUrl:"views/homepage.html"}).when("/login",{templateUrl:"views/login.html",controller:"loginController"}).when("/signup",{templateUrl:"views/signup.html",controller:"registerController"}).when("/d/:doctorid/",{templateUrl:"views/doctor/home.html"}).when("/d/:doctorid/patients/:patientid",{templateUrl:"views/doctor/patient.html"}).when("/d/:doctorid/profile",{templateUrl:"views/doctor/profile.html"}).when("/p/:patientid/",{templateUrl:"views/patient/home.html"}).when("/p/:patientid/orders/new",{templateUrl:"views/patient/new_order.html"}).when("/p/:patientid/doctors/:doctorid",{templateUrl:"views/patient/doctor.html"}).when("/p/:patientid/profile",{templateUrl:"views/patient/profile.html"})}]),app.factory("chatMessages",["$firebase",function(t){var e=new Firebase("https://luminous-heat-3537.firebaseio.com"),r=t(e);return r.$remove(),r.$set("prescriptions",!1),r.$asArray()}]),app.factory("doctor",["$http",function(t){return{getPatients:function(e){t.get("/api/doctors/"+e+"/patients").success(function(t){return t})}}}]),app.factory("patient",["$http",function(t){return{getDoctors:function(e){t.get("/api/patients/"+e+"/doctors").success(function(t){return t})}}}]),app.directive("chat",function(){return{restrict:"E",templateUrl:"../partials/chat.html"}}),app.directive("newrxform",function(){return{restrict:"E",templateUrl:"../partials/doctor/new_rx_form.html"}}),app.directive("newrxpop",function(){return{restrict:"E",templateUrl:"../partials/patient/new_rx_popup.html"}}),app.directive("dprxns",function(){return{restrict:"E",templateUrl:"../partials/doctor/p_rxs.html"}}),app.directive("prxns",function(){return{restrict:"E",templateUrl:"../partials/patient/p_rxs.html"}}),app.directive("pmenu",function(){return{restrict:"E",templateUrl:"../partials/patient/menu.html"}}),app.directive("dmenu",function(){return{restrict:"E",templateUrl:"../partials/doctor/menu.html"}}),app.directive("patients",function(){return{restrict:"E",templateUrl:"../partials/doctor/patients.html"}}),app.directive("patient",function(){return{restrict:"E",templateUrl:"../partials/doctor/patient.html"}}),app.directive("doctors",function(){return{restrict:"E",templateUrl:"../partials/patient/doctors.html"}}),app.directive("doctor",function(){return{restrict:"E",templateUrl:"../partials/patient/doctor.html"}}),app.directive("prxs",function(){return{restrict:"E",templateUrl:"../partials/patient/p_rxs.html"}}),app.directive("neworder",function(){return{restrict:"E",templateUrl:"../partials/patient/new_order.html"}}),app.directive("missedmessages",function(){return{restrict:"E",templateUrl:"../partials/missed_messages.html"}}),app.directive("pprofile",function(){return{restrict:"E",templateUrl:"../partials/patient/profile.html"}}),app.directive("dprofile",function(){return{restrict:"E",templateUrl:"../partials/doctor/profile.html"}}),app.controller("RxController",["$scope","$http","$firebase","newScript",function(t,e,r,i){t.master={},t.update=function(){},t.reset=function(){},t.submit=function(e){i.updateUserPrescriptions(e),i.newOrder(e),t.new_rx_response="RX submitted!"},t.reset()}]),app.controller("ChatController",["$scope","$http","chatMessages",function(t,e,r){t.messages=r,e.get("/api/messages").success(function(e){for(var r=0;r<e.length;r++)t.messages.$add({content:e[r].content,timestamp:e[r].timestamp})}),this.sendText=function(r){t.messages.$add({content:r,timestamp:new Date}),e.post("/api/messages",{content:r,timestamp:new Date}),t.text=""}}]),app.controller("DoctorController",["$scope","$http","$routeParams","newScript",function(t,e,r,i){var n=r.doctorid;e.get("/api/doctors/"+n).success(function(e){t.doctor=e});var s=r.patientid;this.submitNewRx=function(e){e.patientID=s,e.doctorID=n,i.newOrder(e),t.sysMessages="New Prescription Sent",t.showNewRxForm=!1}}]),app.controller("loginController",["$location","$scope","$cookies","$http",function(t,e,r,i){var n=new Firebase("https://luminous-heat-3537.firebaseio.com");e.submit=function(){n.authWithPassword({email:e.credentials.username,password:e.credentials.password},function(e,n){e||(r.id=n.uid,i({method:"GET",url:"/api/login",params:{id:r.id}}).success(function(e){"doctor"===e.userType?t.path("/d/"+e.userId):"patient"===e.userType&&t.path("/p/"+e.userId)}))})}}]),app.controller("newRxFormController",["$scope","$http","$firebase","newScript",function(t,e,r,i){t.master={},t.update=function(){},t.reset=function(){t.rx=angular.copy(t.master)},t.submit=function(e){i.updateUserPrescriptions(e),i.newOrder(e),t.new_rx_response="RX submitted!"},t.reset()}]),app.controller("newScriptController",["$scope","$http","newScript",function(t,e,r){t.newScript=r}]),app.controller("PatientController",["$scope","$http","$routeParams",function(t,e,r){var i=r.patientid;e.get("/api/patients/"+i).success(function(e){t.patientId=i,t.patient=e}),e.get("/api/patients/"+i+"/doctors").success(function(e){t.doctors=e}),e.get("/api/patients/"+i+"/rxs").success(function(e){t.rxs=e});var n=r.doctorid;n&&e.get("/api/patients/"+i+"/doctors/"+n).success(function(e){t.doctor=e})}]),app.controller("registerController",["$scope","$location","$http","$cookies",function(t,e,r,i){var n=new Firebase("https://luminous-heat-3537.firebaseio.com");t.submit=function(){var s={email:t.credentials.username,password:t.credentials.password};n.createUser(s,function(o){null===o&&n.authWithPassword(s,function(n,s){i({method:"POST",url:"/api/users",params:{address:t.credentials.address,name:t.credentials.name,firebase_id:s.uid,avatar_url:t.credentials.avatar_url,email:t.credentials.email,doctor:t.credentials.doctor,patient:t.credentials.patient,prescriptions:[]}}).success(function(t){e.id=t.firebase_id,i({method:"GET",url:"/api/login",data:{id:e.id}}).success(function(t){"doctor"===t.userType?r.path("/d/"+t.userId):"patient"===t.userType&&r.path("/p/"+t.userId)})})})})}}]);
>>>>>>> master
>>>>>>> master
