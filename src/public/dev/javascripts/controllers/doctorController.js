app.controller('DoctorController', ['$scope', '$http', '$routeParams', 'newScript', function($scope, $http, $routeParams, newScript) {

  var doctorID = $routeParams.doctorid; //set this to current doctor id $scope.current_user.id

  //doctors info
  $http.get('/api/doctors/'+ doctorID)
    .success(function(data, status, headers, config) {
      $scope.doctor = data;
  })

  var patientID = $routeParams.patientid;

  //doctors patients
  // $http.get('/api/doctors/'+ doctorID + '/patients')
  //   .success(function(data, status, headers, config) {
  //     $scope.patients = data;
  // })

  // //doctor rxs
  // $http.get('/api/doctors/'+ doctorID +'/rxs')
  //   .success(function(data, status, headers, config) {
  //     $scope.rxs = data;
  // })

  this.submitNewRx = function(newRX) {
    //submit rx

    newRX.patientID = patientID;
    newRX.doctorID = doctorID;

    newScript.newOrder(newRX);

    console.log(newRX);
    console.log("RX SENT");

    $scope.sysMessages = "New Prescription Sent";
    $scope.showNewRxForm = false;
    // newScript.script.prescriptions;


    // $http.post('/api/orders/', newRX)
    //   .done(function(data, status, headers, config) {
    //
    //     $scope.showNewRxForm = false;
    //     console.log("RX SENT!");
    // })
  };

  $scope.drugnames = [
    "Alternagel",
    "Tums, Tums Extra Strength, Tums Ultra",
    "Mylanta, Rolaids",
    "Pepcid AC",
    "Pepcid Complete",
    "Prevacid OTC",
    "Maalox, Maalox Plus, Mylanta",
    "Prilosec OTC",
    "Zantac",
    "Pepto-Bismol, Kaopectate",
    "Imodium A-D",
    "Imodium Advanced",
    "Dulcolax",
    "Fiber-lax",
    "Unifiber",
    "Colace, Dok",
    "Surfak",
    "Fleet Suppositories",
    "Benefiber",
    "Citroma",
    "Phillip’s Milk of Magnesia",
    "Mag OX",
    "Fiber Clear",
    "Citrucel, Citrucel SF",
    "Fleet Mineral Oil Enema",
    "Miralax",
    "Fleet Phospho-soda/Fleet enema",
    "Metamucil",
    "Senokot",
    "Senokot - S",
    "Derifil",
    "Lactaid",
    "Gas-X, Mylicon, Phazyme",
    "Thick It, Thick It - II",
    "Debrox, Murine Ear Wax Removal Kit",
    "Murine Earigate",
    "Star-Otic",
    "Zaditor OTC, Alaway",
    "Naphcon",
    "Naphcon-A",
    "Murine Plus",
    "Visine Allergy",
    "Liquitears",
    "LacriLube SOP",
    "Artificial Tears, Tears Naturale, Murine",
    "Tears Naturale Ointment",
    "Muro-128",
    "Ocuvite Preservision",
    "Ocuvite with Lutein",
    "Ocuvite",
    "Nasalcrom",
    "Afrin",
    "Little Noses, Vicks Sinex",
    "Neo-Synephrine II",
    "Moi-stir, Salivart, Saliva Substitute,",
    "Oasis Spray, Glandosane",
    "Gly-Oxide",
    "Abreva",
    "Peroxyl Oral Cleanser",
    "Phos-flur",
    "Gel-Kam",
    "Tylenol",
    "Tylenol Arthritis",
    "Excedrin",
    "Bayer, St. Joseph’s",
    "Ascriptin",
    "Bufferin",
    "Ecotrin",
    "Motrin IB",
    "Ibuprofen",
    "Advil",
    "Aleve",
    "Zyrtec",
    "Zyrtec D",
    "Chlor-Trimeton",
    "Tavist",
    "Benadryl",
    "Claritin OTC, Alavert",
    "Claritin-D OTC, Alavert-D",
    "Sudafed PE",
    "Tylenol Sinus Congestion",
    "Dristan Cold",
    "Dimetapp",
    "Sudafed",
    "Tussin Max Strength",
    "Coricidine HBP",
    "Little Colds",
    "Tylenol Cold",
    "Tylenol Cold, Triaminic, Comtrex",
    "Dimetapp DM",
    "Triaminic Cough & Cold",
    "Robitussin",
    "Mucinex",
    "Robitussin DM",
    "Robitussin CF",
    "Mucinex D",
    "Robitussin PE, Triaminic",
    "Bronchosaline",
    "PanOxyl, Clearasil",
    "OxyClean,Noxzema Anti-Acne",
    "Polysporin, Double Antibiotic",
    "Lotrimin Ultra",
    "Lotrimin AF, Desenex",
    "Nizoral A-D",
    "Monistat Derm, Micatin, Microguard",
    "Neosporin Plus",
    "Neosporin, Triple Antibiotic",
    "Lamisil AT",
    "Lamisil AT Spray",
    "Tinactin",
    "Caladryl, Calamine",
    "Cortizone, Cortaid, Scalpacin",
    "Benadryl Topical",
    "Itch Relief",
    "Amlactin AP",
    "Caladryl",
    "Caladryl Clear",
    "Amlactin, Lac-Hydrin",
    "Carmol 10, Carmol 20",
    "Vaseline",
    "Nix",
    "Rid Complete",
    "Rid",
    "Capzasin-P, Zostrix",
    "Lavacol",
    "Rubbing Alcohol",
    "Betadine",
    "Duofilm, Duoplant, Compound W, Mediplast",
    "Caltrate, Os-Cal",
    "Caltrate-D",
    "Vi-Active",
    "Caltrate-600 Plus, Os-Cal Ultra",
    "Citracal",
    "Citracal-D",
    "Calcionate",
    "Ferretts",
    "Ferro-DSS",
    "Feosol, Fer-in-sol",
    "Niferex-150, Ferex-150",
    "Magnacaps",
    "Slow Mag",
    "Magonate",
    "Uromag",
    "Salt Tabs",
    "Neutra-Phos",
    "Neutra-Phos-K",
    "Orazinc, Zinc 220",
    "Centrum Children’s, Flintstone",
    "Poly-Vi-Flor",
    "Centrum, Certagen, Century Vits",
    "One-A-Day Iron",
    "Centrum Silver, Certagen Senior",
    "Stuartnatal (OTC)",
    "Theragram-M, Hexavitamins",
    "Vitron-C",
    "Slo-Niacin",
    "Plan B, Next Choice",
    "Gyne-Lotrimin-3, Gyne-Lotrimin-7,",
    "Mycelex-7",
    "Monistat-3, Monistat-7",
    "Vagistat-1",
    "Dramamine",
    "Glutose, Insta-Glucose",
    "Dramamine II, Bonine",
    "Actidose-Aqua, Insta-char",
    "prenatal multivitamins",
    "therapeutic multivitamins",
    "ascorbic acid (vitamin C)",
    "ascorbic acid/ferrous fumarate",
    "cholecalciferol (vitamin D3)",
    "cyanocobalamin (vitamin B-12)",
    "folic acid",
    "ergocalciferol (vitamin D2)",
    "niacin (immediate & extended-release)",
    "niacinamide",
    "pantothenic acid",
    "pyridoxine (vitamin B-6)",
    "riboflavin (vitamin B-2)",
    "thiamine (vitamin B-1)",
    "vitamin E"
  ];

  $scope.addItem = function(item) {
    $scope.item = {};
  }

}]);