app.config(['$routeProvider', function($routeProvider) {
    $routeProvider

    .when('/', {
        templateUrl : '/home.html',
        controller  : 'loginController'
    })

    .when('/user/:userid', {
        templateUrl : 'shared/user/user.html',
        controller  : 'userController'
    })

}]);
