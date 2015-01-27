app.config(function($routeProvider) {
    $routeProvider

    .when('/', {
        templateUrl : 'views/homepage.html',
        controller  : 'HomepageController'
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

    .when('/d/patients/:id', {
        templateUrl : 'views/doctor/patient.html'
    })

    .when('/d/doctors/:id/profile', {
        templateUrl : 'views/doctor/profile.html'
    })

    .when('/p', {
        templateUrl : 'views/patient/home.html'
    })

    .when('/p/orders/new', {
        templateUrl : 'views/patient/new_order.html'
    })

    .when('/p/doctors/:id', {
        templateUrl : 'views/patient/doctor.html'
    })

    .when('/p/patients/:id/profile', {
        templateUrl : 'views/patient/profile.html'
    })
});