var mongoose = require('mongoose');
var artistSchema = require('./artist.schema.server');
var artistModel = mongoose.model('ArtistModel', artistSchema);

function createArtist(artist) {
    return artistModel.create(artist);
}

function findArtistBySpotifyId(id) {
    return artistModel.findOne({spotifyId: id})
}
var api = {
    createArtist: createArtist,
    findArtistBySpotifyId: findArtistBySpotifyId
};
module.exports = api;