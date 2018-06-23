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

var api = {
    createPlaylist: createPlaylist,
    deletePlaylist: deletePlaylist,
    getTracksInPlaylist: getTracksInPlaylist
};

module.exports = api;