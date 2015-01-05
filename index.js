"use strict";

// -- Module dependencies ------------------------------------------------------
var express     = require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var logger      = require('./lib/logger');

// -- Locals -------------------------------------------------------------------
var app         = module.exports = express();
var port        = process.env.PORT || 3000;

// -- Middlewares --------------------------------------------------------------
app.use(bodyParser.json('application/json'));

// -- Routes -------------------------------------------------------------------
var resources = require('./lib/resource');
app.use(resources);

// -- Start API server ---------------------------------------------------------
app.listen(port, function(){
  logger.info('Express App running on http://localhost:%s', port);
});
