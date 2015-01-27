app.config(['$routeProvider', function($routeProvider) {
    $routeProvider

    .when('/', {
        templateUrl : 'views/homepage.html'
    })

    .when('/login', {
        templateUrl : 'views/login.html',
        controller  : 'LoginController'
    })

    .when('/signup', {
        templateUrl : 'views/signup.html',
        controller  : 'SignupController'
    })

    .when('/d', {
        templateUrl : 'views/doctor/home.html'
    })

    .when('/d/patients', {
        templateUrl : 'views/doctor/patient.html'
    })

    .when('/d/profile', {
        templateUrl : 'views/doctor/profile.html'
    })

    .when('/p', {
        templateUrl : 'views/patient/home.html'
    })

    .when('/p/orders/new', {
        templateUrl : 'views/patient/new_order.html'
    })

    .when('/p/doctors', {
        templateUrl : 'views/patient/doctor.html'
    })

    .when('/p/profile', {
        templateUrl : 'views/patient/profile.html'
    });
}]);