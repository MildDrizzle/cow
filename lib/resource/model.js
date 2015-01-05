"use strict";

var mongoose =  require('mongoose');
var Schema    = mongoose.Schema;

var resourceSchema = new Schema({
  resource : {
    title: { type: 'String' }
  }
});

module.exports = mongoose.model('Resource', resourceSchema);
