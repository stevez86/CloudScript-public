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
        templateUrl : 'views/doctor/home.html',
        controller  : 'DoctorController'
    })

    .when('/d/:doctorid/patients/:patientid', {
        templateUrl : 'views/doctor/patient.html',
        controller  : 'DoctorController'
    })

    .when('/d/:doctorid/profile', {
        templateUrl : 'views/doctor/profile.html',
        controller  : 'DoctorController'
    })

    .when('/p/:patientid/', {
        templateUrl : 'views/patient/home.html',
        controller  : 'PatientController'
    })

    .when('/p/:patientid/orders/:orderid', {
        templateUrl : 'views/patient/order.html',
        controller  : 'PatientController'
    })

    .when('/p/:patientid/doctors/:doctorid', {
        templateUrl : 'views/patient/doctor.html',
        controller  : 'PatientController'
    })

    .when('/p/:patientid/profile', {
        templateUrl : 'views/patient/profile.html',
        controller  : 'PatientController'
    })

    .when('/p/:patientid/prescriptions/:prescriptionIndex', {
        templateUrl : 'views/patient/prescription.html',
        controller  : 'PatientController'
    });

}]);
