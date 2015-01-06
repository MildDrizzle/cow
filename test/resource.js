"use strict";

var request   = require('supertest-as-promised');
var expect    = require('chai').expect;
var _         = require('lodash');
var mongoose  = require('mongoose');
var Resource  = require('../lib/resource/model');
var api       = require('../index.js');
var host      = process.env.API_TEST_HOST || api;

request = request(host);

describe('Resources collection [/resource]', function() {
  // -- Helpers ----------------------------------------------------------------

  // Connect to test-database before battery test
  before(function(done) {
    mongoose.connect('mongodb://localhost/cow-test', done);
  });

  // Disconnet and clean DB test after battery test
  after(function(done) {
    mongoose.disconnect(done);
    mongoose.models = {};
  });

  // -- Tests ------------------------------------------------------------------

  describe('POST', function() {
    it('should be create a resource', function(done) {
      var data = { "title": "A new resource" };

      request
        .post('/resource')
        .set('Accept', 'application/json')
        .send(data)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .end(function(err, res) {
          var body = res.body;
          // Properties
          expect(body).to.have.property('title', 'A new resource');
          expect(body).to.have.property('_id');
          done(err);
        });
    });
  });

  describe('GET /:id', function() {
    it('should get an existing resource', function(done) {
      var id;
      var data = { "title": "A new resource" };

      request
        .post('/resource')
        .set('Accept', 'application/json')
        .send(data)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .then(function getResource(res) {
          id = res.body._id;

          return request
            .get('/resource/' + id)
            .set('Accept', 'application/json')
            .send()
            .expect(200)
            .expect('Content-Type', /application\/json/)
        }, done)
        .then(function assertions(res) {
          var body = res.body;
          // Properties
          expect(body).to.have.property('_id', id);
          expect(body).to.have.property('title', 'A new resource');
          done();
        }, done);
    });
  });

  describe('GET', function() {
    //TODO
  });

  describe('PUT /:id', function() {
    //TODO
  });

  describe('DELETE /:id', function() {
    //TODO
  });

});
