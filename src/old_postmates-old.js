var Postmates = require('postmates');
var pmcf = require('./postmates_config');
var http = require('http');
// var request = require('request');

exports.getQuote = function(options) {

  console.log(options);

  var pmCustomerID = pmcf.customerId;

  console.log("POST address: " + pmcf.deliveryQuoteUrl(pmCustomerID))

  var pmData = {
    dropoff_address: options.dropoff_address,
    pickup_address: options.pickup_address
  }

  var pmHeaders = {

  }

  var pmRequest = {
    url: pmcf.deliveryQuoteUrl(pmCustomerID),
    headers: {username: pmCustomerID, password: ""},
    data: pmData
  }

  // options.deliveryAddress
  // post to this when ready : pmcf.deliveryQuoteUrl(pmCustomerID)
  var test_options = {
     host: 'https://api.github.com/',
     path: '/',
     method: 'GET'
  }

  console.log("GITHUB POST")

  http.request(test_options, function(res) {
    console.log("HIIIIII")
    console.log(res.body);
    console.log(delivery_quote);
  })

}
