app.factory("chatMessages", ["$firebase", function($firebase) {
     // create a reference to the Firebase where we will store our data
     var ref = new Firebase("https://luminous-heat-3537.firebaseio.com");

      // Create new FireBase object to perform tasks
      var FirebaseDB = $firebase(ref);

      // Delete all records in the FireBase database
      FirebaseDB.$remove();

      FirebaseDB.$set("prescriptions", false);

     // this uses AngularFire to create the synchronized array
     return FirebaseDB.$asArray();
  }
]);