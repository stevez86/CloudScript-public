// app.service('loginHelper', ['$http', '$cookies', '$location', function($http, $cookies, $location) {

//   login: function(err, authData){
//     if (err) { console.log("Error", err) };
//     console.log(authData);
//     $cookies.id = authData.uid
//     $http({
//       method: "GET",
//       url: "/api/login",
//       data: {id: $cookies.id}
//     })
//       .success(function(data) {
//         if (data.userType === "doctor") {
//           $location.path('/d/' + data.userId)
//         } else if (data.userType === "patient") {
//           $location.path('/p/' + data.userId)
//         } else { console.log("Error!") };
//             console.log("Success", authData)
//             })
//   },
//   newUser: function(error, authData) {
//     if (error) { console.log("Error", error) }
//     else {
//       $http.post('/api/users', {
//         address:        $scope.credentials.address,
//         name:           $scope.credentials.name,
//         firebase_id:    authData.uid,
//         avatar_url:     $scope.credentials.avatar_url,
//         email:          $scope.credentials.email,
//         doctor:         $scope.credentials.doctor,
//         patient:        $scope.credentials.patient,
//         prescriptions:  []
//       }).success(function(data) {
//         this.login(null, data)
//       })
//   }
// }])
