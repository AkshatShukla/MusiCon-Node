var mongoose = require('mongoose');
var albumSchema = require('./album.schema.server');
var albumModel = mongoose.model('AlbumModel', albumSchema);

function createAlbum(newAlbum) {
    return albumModel.create(newAlbum);
}

function findAlbumBySpotifyId(id) {
    return albumModel.findOne({spotifyId: id})
}

var api = {
    createAlbum: createAlbum,
    findAlbumBySpotifyId: findAlbumBySpotifyId
};

module.exports = api;