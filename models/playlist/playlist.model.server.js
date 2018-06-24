var mongoose = require('mongoose');
var playlistSchema = require('./playlist.schema.server');
var playlistModel = mongoose.model('PlaylistModel', playlistSchema);

function createPlaylist(playlist) {
    return playlistModel.create({
        name: playlist.name,
        description: playlist.description
    })
}

function deletePlaylist(playlistId) {
    return playlistModel.remove(playlistId)
}

function getTracksInPlaylist(playListId) {
    return playlistModel.findOne({_id: playListId._id}, {track: 1}).populate('track')
}

function addTrackToPlaylist(playlistId, track) {
    return playlistModel.update({_id: playlistId._id}, {$push: {track: track._id}})
}

function isTrackPresentInPlaylist(playlistId, trackId) {
    return playlistModel.findOne({ $and: [{_id: playlistId._id}, {track: {$in: [trackId._id]}}]})
}

function deleteTrackFromPlaylist(playlistId, trackId) {
    return playlistModel.update({_id: playlistId._id}, {$pull: {track: trackId._id}})
}
function updatePlaylist(playlist){
    return playlistModel.updateOne({_id:playlist._id},playlist)
}

var api = {
    createPlaylist: createPlaylist,
    deletePlaylist: deletePlaylist,
    getTracksInPlaylist: getTracksInPlaylist,
    addTrackToPlaylist: addTrackToPlaylist,
    isTrackPresentInPlaylist: isTrackPresentInPlaylist,
    deleteTrackFromPlaylist: deleteTrackFromPlaylist,
    updatePlaylist:updatePlaylist
};

module.exports = api;