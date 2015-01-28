app.controller('userController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

  var userId = $routeParams.userId; //set this to current patient id $scope.current_user.id

    $http.get('/api/user/'+ userId)
      .success(function(data, status, headers, config) {
        console.log(data);
        $scope.patient = data;
    })
  }
}]);