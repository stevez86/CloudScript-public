app.config(['$routeProvider', function($routeProvider) {
    $routeProvider

    .when('/', {
        templateUrl : 'views/homepage.html'
    })

    .when('/login', {
        templateUrl : 'views/login.html',
        controller  : 'loginController'
    })

    .when('/signup', {
        templateUrl : 'views/signup.html',
        controller  : 'registerController'
    })

    .when('/d/:doctorid/', {
        templateUrl : 'views/doctor/home.html'
    })

    .when('/d/:doctorid/patients/:patientid', {
        templateUrl : 'views/doctor/patient.html'
    })

    .when('/d/:doctorid/profile', {
        templateUrl : 'views/doctor/profile.html'
    })

    .when('/p/:patientid/', {
        templateUrl : 'views/patient/home.html'
    })

    .when('/p/:patientid/orders/:orderid', {
        templateUrl : 'views/patient/order.html'
    })

    .when('/p/:patientid/doctors/:doctorid', {
        templateUrl : 'views/patient/doctor.html'
    })

    .when('/p/:patientid/profile', {
        templateUrl : 'views/patient/profile.html'

    });
}]);
