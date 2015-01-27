app.config(function($routeProvider) {
    $routeProvider

    .when('/', {
        templateUrl : 'views/homepage.html',
        controller  : 'HomepageController'
    })

    .when('/login', {
        templateUrl : 'views/login.html',
        controller  : 'loginController'
    })

    .when('/signup', {
        templateUrl : 'views/signup.html',
        controller  : 'registerController'
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
    })
});
