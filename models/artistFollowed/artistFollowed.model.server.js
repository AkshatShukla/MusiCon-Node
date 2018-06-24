var mongoose = require('mongoose');
var artistFollowedSchema = require('./artistFollowed.schema.server');
var artistFollowedModel = mongoose.model('ArtistFollowedModel', artistFollowedSchema);


function createFollow(userId, artistId) {
    return artistFollowedModel.create({artist: artistId, user: userId, hash: artistId + userId})
}

function findByHash(userId, artistId) {
    return artistFollowedModel.findOne({hash: artistId + userId})
}

function findFollowedArtistsForUser(userId) {
    return artistFollowedModel.find({user: userId}, {artist: 1}).populate('artist')
}

function unfollowArtist(userId, artistId) {
    return artistFollowedModel.deleteOne({user: userId, artist: artistId})
}

var api = {
    createFollow: createFollow,
    findByHash: findByHash,
    findFollowedArtistsForUser: findFollowedArtistsForUser,
    unfollowArtist: unfollowArtist
};

module.exports = api;