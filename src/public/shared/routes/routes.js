app.config(['$routeProvider', function($routeProvider) {
    $routeProvider

    .when('/', {
        templateUrl : 'shared/login/login.html',
        controller  : 'loginController'
    })

    .when('/user/:userid/home', {
        templateUrl : 'shared/user/home.html',
        controller  : 'userController'
    })

    .when('/user/:userid/profile', {
        templateUrl : 'shared/user/profile.html',
        controller  : 'userController'
    })

    .when('user/:userid/prescriptions/:prescriptionid',{
        templateUrl : 'shared/prescriptions/prescription.html',
        controller  : 'userController'
    })

}]);
