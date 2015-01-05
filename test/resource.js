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

  // Clean database before battery test
  before(function(done) {
    mongoose.connect('mongodb://localhost/cow-test', done);
  });

  // Disconnet from DB test after battery test
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
    //TODO
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
