var mongoose = require('mongoose');
var eventSchema = require('./event.schema.server');
var eventModel = mongoose.model('EventModel', eventSchema);


var api = {
};

module.exports = api;