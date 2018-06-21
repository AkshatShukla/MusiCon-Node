var mongoose = require('mongoose');
var eventPerformedSchema = require('./eventPerformed.schema.server');
var eventPerformedModel = mongoose.model('EventPerformedModel', eventPerformedSchema);


var api = {
};

module.exports = api;