var expect = require('chai').expect;
var request = require('supertest');
var setupNocks = require('setup-nocks');

describe('OperaLocal', function() {

  var recorder = setupNocks.prototype.record('CloudScript', {nock_file_path: 'fixtures/CloudScript.js'});
  before(recorder.before);

  describe('GET "/"', function () {

    it('is is a valid route', function (done) {
      request("http://localhost:3000")
        .get('/')
        .end(function(err, res) {
          expect(res.statusCode).to.eq(200)
          done();
      });
    });

    it('displays a chat window', function(done) {
      request("http://localhost:3000")
        .get('/')
        .end(function(err, res) {
          expect(res.body).to.include("<h1>Chat!</h1>")
        })
    });

  });

});
