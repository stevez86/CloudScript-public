(function() {
  var mocha = require('mocha');
  var setupNocks = require('setup-nocks');
  var expect = require('chai').expect;
  var request = require('supertest');

  setupNocks.options = {
  projectName: 'CloudScript',
  url: "http://localhost:3000",
  projectOptions:
    {
      test_folder: '../test',
      nock_file_path: 'test/fixtures/CloudScript.js'
    },
  };

  setupNocks.run();

})();