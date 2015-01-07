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
    mongoose.connection.collections['resources'].drop(function(err) {
      console.log("Database dropped");
    });
    mongoose.disconnect(done);
  });

  // -- Tests ------------------------------------------------------------------

  describe('POST /resource', function() {
    it('should be create a resource', function(done) {
      var data = { "title": "A new resource" };

      request
        .post('/resource')
        .set('Accept', 'application/json')
        .send(data)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      .end(function assertions(err, res) {
        var body = res.body;

        // Properties
        expect(body).to.have.property('title', 'A new resource');
        expect(body).to.have.property('_id');

        done(err);
      });
    });
  });

  describe('GET /resource/:id', function() {
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

  describe('GET /resource', function() {
    it('should get all existing resources', function(done) {
      var id1, id2;
      var data1 = { "title": "A new resource" },
          data2 = { "title": "Another resource" };

      request
        .post('/resource')
        .set('Accept', 'application/json')
        .send(data1)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      .then(function postAnotherResource(res) {
        id1 = res.body._id;
        return request
          .post('/resource')
          .set('Accept', 'application/json')
          .send(data2)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      })
      .then(function getResources(res) {
        id2 = res.body._id;
        return request.get('/resource')
          .set('Accept', 'application/json')
          //.send()
          .expect(200)
          .expect('Content-Type', /application\/json/)
      }, done)
      .then(function assertions(res) {
        var resources = res.body;

        expect(resources)
          .to.be.an('array')
          .and.to.have.length.above(2);

        var resource1 = _.find(resources, { _id: id1 });
        var resource2 = _.find(resources, { _id: id2 });

        // Properties
        expect(resource1).to.have.property('_id', id1);
        expect(resource1).to.have.property('title', 'A new resource');
        expect(resource2).to.have.property('_id', id2);
        expect(resource2).to.have.property('title', 'Another resource');

        done();
      }, done);
    });
  });

  describe('PUT /:id', function() {
    //TODO
  });

  describe('DELETE /:id', function() {
    //TODO
  });

});
