var mongoose = require('mongoose');
var artistFollowedSchema = require('./artistFollowed.schema.server');
var artistFollowedModel = mongoose.model('ArtistFollowedModel', artistFollowedSchema);


var api = {
};

module.exports = api;