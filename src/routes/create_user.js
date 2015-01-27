var User = require('../models/User')
module.exports = function(req, res, next) {
  console.log(req.query);
  // User.create(req.query)
  res.send(200);
};
