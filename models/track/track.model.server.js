var mongoose = require('mongoose');
var trackSchema = require('./track.schema.server');
var trackModel = mongoose.model('TrackModel', trackSchema);


var api = {
};

module.exports = api;