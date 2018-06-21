var mongoose = require('mongoose');
var trackRecommendedSchema = require('./trackRecommended.schema.server');
var trackRecommendedModel = mongoose.model('TrackRecommendedModel', trackRecommendedSchema);


var api = {
};

module.exports = api;