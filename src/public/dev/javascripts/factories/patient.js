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