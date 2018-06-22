var mongoose = require('mongoose');
var trackSchema = require('./track.schema.server');
var trackModel = mongoose.model('TrackModel', trackSchema);


function createTrack(newTrack) {
    return trackModel.create(newTrack);
}

function findTrackBySpotifyId(id) {
    return trackModel.findOne({spotifyId: id})
}
var api = {
    createTrack: createTrack,
    findTrackBySpotifyId: findTrackBySpotifyId
};

module.exports = api;