app.directive('chat', function(){
  return {
    restrict: 'E',
    templateUrl: '../partials/chat.html',
  };
});

app.directive('newrxform', function(){
  return {
    restrict: 'E',
    templateUrl: '../partials/doctor/new_rx_form.html',
  };
});

app.directive('newrxpop', function(){
  return {
    restrict: 'E',
    templateUrl: '../partials/patient/new_rx_popup.html',
  };
});

app.directive('dprxns', function(){
  return {
    restrict: 'E',
    templateUrl: '../partials/doctor/p_rxs.html',
  };
});

app.directive('prxns', function(){
  return {
    restrict: 'E',
    templateUrl: '../partials/patient/p_rxs.html',
  };
});

app.directive('pmenu', function(){
  return {
    restrict: 'E',
    templateUrl: '../partials/patient/menu.html',
  };
});

app.directive('dmenu', function(){
  return {
    restrict: 'E',
    templateUrl: '../partials/doctor/menu.html',
  };
});

app.directive('patients', function(){
  return {
    restrict: 'E',
    templateUrl: '../partials/doctor/patients.html',
  };
});

app.directive('patient', function(){
  return {
    restrict: 'E',
    templateUrl: '../partials/doctor/patient.html',
  };
});

app.directive('doctors', function(){
  return {
    restrict: 'E',
    templateUrl: '../partials/patient/doctors.html',
  };
});

app.directive('doctor', function(){
  return {
    restrict: 'E',
    templateUrl: '../partials/patient/doctor.html',
  };
});

app.directive('prxs', function(){
  return {
    restrict: 'E',
    templateUrl: '../partials/patient/p_rxs.html',
  };
});

app.directive('neworder', function(){
  return {
    restrict: 'E',
    templateUrl: '../partials/patient/new_order.html',
  };
});

app.directive('missedmessages', function(){
  return {
    restrict: 'E',
    templateUrl: '../partials/missed_messages.html',
  };
});

app.directive('pprofile', function(){
  return {
    restrict: 'E',
    templateUrl: '../partials/patient/profile.html',
  };
});

app.directive('dprofile', function(){
  return {
    restrict: 'E',
    templateUrl: '../partials/doctor/profile.html',
  };
});

app.directive('newscript', function(){
  return {
    restrict: 'E',
    templateUrl: '../partials/patient/new_rx_popup.html',
  };
});