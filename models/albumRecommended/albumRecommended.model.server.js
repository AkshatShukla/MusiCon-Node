var mongoose = require('mongoose');
var albumRecommendedSchema = require('./albumRecommended.schema.server');
var albumRecommendedModel = mongoose.model('AlbumRecommendedModel', albumRecommendedSchema);


var api = {
};

module.exports = api;