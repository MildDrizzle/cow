"use strict";

var request   = require('supertest-as-promised');
var expect    = require('chai').expect;
var _         = require('lodash');
var mongoose  = require('mongoose');
var Resource  = require('../lib/resource/model');
var api       = require('../index.js');
var host      = process.env.API_TEST_HOST || api;

request = request(host);

// -- Tests --------------------------------------------------------------------
describe('Resources collection [/resource]', function() {
  describe('POST', function() {
    //TODO
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

// -- Private methods ----------------------------------------------------------
function _createResource() {
  var id;
  var data = {
    'title': 'A new resource'
  };

  return request
    .post('/resource')
    .set('Accept', 'application/json')
    .send(data)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  .then(function getResource(res) {
    this.id = res.body._id,
    this.resource = res.body
  }.bind(this));
};
