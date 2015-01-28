app.config(['$routeProvider', function($routeProvider) {
    $routeProvider

    .when('/', {
        templateUrl : 'views/homepage.html'
    })

    .when('/login', {
        templateUrl : 'shared/login.html',
        controller  : 'loginController'
    })

    .when('/signup', {
        templateUrl : 'shared/signup.html',
        controller  : 'signupController'
    })

    .when('/doctor/:doctorid/', {
        templateUrl : 'components/doctor/index.html'
    })

    .when('/doctor/:doctorid/patients/:patientid', {
        templateUrl : 'components/doctor/view_patient.html'
    })

    .when('/doctor/:doctorid/profile', {
        templateUrl : 'components/doctor/profile.html'
    })

    .when('/patient/:patientid/', {
        templateUrl : 'components/patient/index.html'
    })

    .when('/patient/:patientid/orders/new', {
        templateUrl : 'components/patient/new_order.html'
    })

    .when('/patient/:patientid/doctors/:doctorid', {
        templateUrl : 'components/patient/view_doctor.html'
    })

    .when('/patient/:patientid/profile', {
        templateUrl : 'components/patient/profile.html'

    });
}]);
