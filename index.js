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
var resource = require('./lib/resource');
app.use(resource);

// -- Start API server ---------------------------------------------------------
if(!module.parent) {
  mongoose.connect('mongodb://localhost/cow-dev', function() {
    app.listen(port, function(){
      logger.info('Express App running on http://localhost:%s', port);
    });
  });
}
