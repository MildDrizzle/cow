"use strict";

// -- Module Dependencies ------------------------------------------------------
var app     = require('express')();
var logger  = require('../logger');
var _       = require('lodash');

// -- Locals -------------------------------------------------------------------
var Resource = require('./model');

// -- Verbs --------------------------------------------------------------------
app.route('/resource/:id?')

  .all(function(req, res, next) {
    logger.info(req.method, req.path, req.body);
    res.set('Content-Type', 'application/json');
    next();
  })

  // POST
  .post(function(req, res, next) {
    var resource = req.body;
    Resource.create(resource, function(err, data) {
      return res.status(201).json(data);
    });
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
