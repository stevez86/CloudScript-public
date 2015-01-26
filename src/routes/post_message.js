module.exports = function(req, res, next) {

  // Hard coded find for conversation - change when authentication is implemented

  Conversation.findOne("54c56f10e4b06ac679179453").exec(function(err, conversation) {
    Message.create(req.body)
    .then(function(message) {
      var deferred = Q.defer();
      conversation.messages.push(message);
      deferred.resolve();
      return deferred.promise
    })
    .then(function() {
      var deferred = Q.defer();
      conversation.save(function(err, obj, numAffected) {
        if (err) deferred.reject(err)
        else deferred.resolve()
      });
      return deferred.promise
    })
    .then(function() {
      res.sendStatus(200);
    })
  })
};