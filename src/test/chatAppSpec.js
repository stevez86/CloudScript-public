var expect = require('chai').expect;
var request = require('supertest');
var setupNocks = require('setup-nocks');

describe('CloudScript', function() {

  describe('GET "/"', function () {

    it('is is a valid route', function (done) {
      request("http://localhost:3000")
        .get('/')
        .end(function(err, res) {
          expect(res.statusCode).to.eq(200)
          done();
      });
    });

  });

  describe('GET "/api/messages"', function () {

    it('is is a valid route', function (done) {
      this.timeout(5000);
      request("http://localhost:3000")
        .get('/api/messages')
        .end(function(err, res) {
          expect(res.statusCode).to.eq(200)
          done();
      });
    });

    it('returns an array', function (done) {
      this.timeout(5000);
      request("http://localhost:3000")
        .get('/api/messages')
        .end(function(err, res) {
          expect(res.body).to.be.instanceof(Array)
          done();
      });
    });

  });


  describe('POST "/api/messages"', function () {

    it('is is a valid route', function (done) {
      request("http://localhost:3000")
        .post('/api/messages')
        .end(function(err, res) {
          expect(res.statusCode).to.eq(200)
          done();
      });
    });

  });

  describe('POST "/orders"', function () {

    it('is is a valid route', function (done) {
      request("http://localhost:3000")
        .post('/orders')
        .end(function(err, res) {
          expect(res.statusCode).to.eq(200)
          done();
      });
    });

    it('returns a Postmates quote as a JSON object', function (done) {
      request("http://localhost:3000")
        .post('/orders')
        .end(function(err, res) {
          expect(res.body).to.include.keys('kind', 'fee', 'duration', 'dropoff_eta')
          done();
      });
    });

  });

});
