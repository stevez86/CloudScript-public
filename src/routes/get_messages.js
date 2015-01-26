module.exports = function(req, res, next) {
  // Hard coded find for conversation - change when authentication is implemented
  Conversation.findOne("54c56f10e4b06ac679179453", function(err, results) {
    res.json(results.messages);
  })
}