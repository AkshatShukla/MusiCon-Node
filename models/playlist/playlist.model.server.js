var mongoose = require('mongoose');
var playlistSchema = require('./playlist.schema.server');
var playlistModel = mongoose.model('PlaylistModel', playlistSchema);


var api = {
};

module.exports = api;