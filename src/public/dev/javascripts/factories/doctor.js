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