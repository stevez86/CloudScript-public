app.config(['$routeProvider', function($routeProvider) {
    $routeProvider

    .when('/', {
        templateUrl : '../shared/login/login.html',
        controller  : 'loginController'
    })

    .when('/user/:userid/', {
        templateUrl : '../shared/user/user.html',
        controller  : 'userController'
    })

}]);
