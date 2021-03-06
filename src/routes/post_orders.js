module.exports = function(req, res, next) {
  //create a new order with the manifest

  var new_order = req.body;

  //get pickup address : google maps api
  var pickup_address;

  //get dropoff address: MVP: user's home address
  var dropoff_address = "874+fell+St,+San+Francisco,+CA";

  //api call to retrieve lat and lng of dropoff address
  request('https://maps.googleapis.com/maps/api/geocode/json?address=' + dropoff_address + '&key=' + process.env.GOOGLEAPI, function(error, response, body){
    var latLong = JSON.parse(body)
    var lat = latLong.results[0].geometry.location.lat
    var lng = latLong.results[0].geometry.location.lng

    //api call to retrieve walgreens within 5000 units of lat + lng
    request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lng + '&radius=5000&name=walgreens&key=' + process.env.GOOGLEAPI, function(error, response, body){
      var walgreens = JSON.parse(body)
      pickup_address = walgreens.results[0].vicinity
    })
  })

  var delivery = {
    pickup_address: pickup_address,
    dropoff_address: dropoff_address
  };

  //Call to postmates api to get qupte for order
  // var postmates = new Postmates(process.env.POSTMATES_CUSTOMER_ID, process.env.POSTMATES_TEST_API_KEY);

  // postmates.quote(delivery, function(err, res) {
  //   console.log(res.body); // 799
  // });

  //this is mocked data from postmates
  res.json({ kind: 'delivery_quote',
    fee: 1350,
    created: '2015-01-24T02:04:17Z',
    expires: '2015-01-24T02:09:17Z',
    currency: 'usd',
    duration: 60,
    dropoff_eta: '2015-01-24T03:09:17Z',
    id: 'dqt_KBAxcFWu1rKuPV' });

};