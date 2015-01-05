"use strict";

var mongoose =  require('mongoose');
var Schema    = mongoose.Schema;

var resourceSchema = new Schema({
  title: { type: 'String' }
});

var model = mongoose.model('Resource', resourceSchema);
module.exports = model;
