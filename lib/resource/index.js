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

  .post(function(req, res, next) {
    // POST /resource
    var resource = req.body;
    Resource.create(resource, function(err, data) {
      return res.status(201).json(data);
    });
  })

  .get(function(req, res) {
    var id = req.params.id;

    // GET /resource
    if(!id) {
      Resource.find({}, function(err, resources) {
        if(err) {
          return res.status(500).send(err);
        }
        return res.status(200).json(resources);
      });
    }

    // GET /resource/:id
    Resource.findById(id, function(err, resource) {
      if(err) {
        return res.status(500).send(err);
      }
      return res.status(200).json(resource);
    });
  })

  .put(function(req, res, next) {
    var id = req.params.id;
    var updatedResource = req.body;

    if(!id) {
      return next();
    }

    // PUT /resource/:id
    Resource.findOneAndUpdate({ _id: id }, updatedResource, function(err, resource) {
      if(err) {
        return res.status(500).send(err);
      }
      res.status(200).json(resource);
    });
  })

  .delete(function(req, res, next) {
    var id = req.params.id;
    if(!id) {
      return next();
    }

    Resource.findOneAndRemovero({ _id: id }, function(err) {
      if(err) {
        return res.status(500).send(err);
      }
      res.status(204).end();
    });
  });

module.exports = app;
