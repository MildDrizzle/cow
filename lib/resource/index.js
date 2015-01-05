"use strict";

// -- Module Dependencies ------------------------------------------------------
var app     = require('express')();
var logger  = require('../logger');
var _       = require('lodash');

// -- Locals -------------------------------------------------------------------
var Resource = require('./model');

// -- Verbs --------------------------------------------------------------------
app.route('/resources/:id?')
  .all(function(req, res, next) {
    //TODO
  })
  .post(function(req, res, next) {
    //TODO
  })
  .get(function(req, res, next) {
    //TODO
  })
  .put(function(req, res, next) {
    //TODO
  })
  .delete(function(req, res, next) {
    //TODO
  });

module.exports = app;
