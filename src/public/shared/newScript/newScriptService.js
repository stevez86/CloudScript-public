app.service('newScript', ['$cookies', '$http', '$routeParams', '$route', '$firebase', function($cookies, $http, $routeParams, $route, $firebase) {
  var self = this;
  var ref = new Firebase("https://luminous-heat-3537.firebaseio.com");
  var sync = $firebase(ref);
  this.script = sync.$asObject();

  this.updateUserPrescriptions = function(rx) {
    $http.post('/api/users/' + $routeParams.userid + '/prescriptions', {name: rx.name, qty: rx.qty, prescribing_doctor: $cookies.id})
      .success(function() {
        self.script.prescriptions = true;
      });
  };

  this.newOrder = function(rx) {
    $http.post('/api/orders', rx)
      .success(function(data, status, headers, config) {
        self.orderData = data;

        self.script.$save().then(function(ref) {}, function(error) {});
      });
  };

  this.orderScript = function() {
    console.log("Script ordered!");
    // PLACE ORDER WITH POSTMATES
  };

}]);