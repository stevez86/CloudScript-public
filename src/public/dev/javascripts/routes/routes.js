app.config(function($routeProvider) {
    $routeProvider

    .when('/', {
        templateUrl : 'dev/views/homepage.html'
        // templateUrl : 'views/homepage.html'
        // templateUrl : '/views/homepage.html'
        // templateUrl : './views/homepage.html'
        // templateUrl : 'dist/views/homepage.html'
        // templateUrl : '/dist/views/homepage.html'
        // templateUrl : './dist/views/homepage.html'
        // templateUrl : '../public/dist/views/homepage.html'
    })

    .when('/login', {
        templateUrl : 'dist/views/login.html',
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
});