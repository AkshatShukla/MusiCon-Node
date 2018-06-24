var mongoose = require('mongoose');
var audiophileFollowedSchema = require('./audiophileFollowed.schema.server');
var audiophileFollowedModel = mongoose.model('AudiophileFollowedModel', audiophileFollowedSchema);

function createFollow(userId, audiophileId) {
    return audiophileFollowedModel.create({audiophile: audiophileId, listener: userId, hash: audiophileId + userId})
}

function findByHash(userId, audiophileId) {
    return audiophileFollowedModel.findOne({hash: audiophileId + userId})
}

function findFollowedAudiophilesForUser(userId) {
    return audiophileFollowedModel.find({listener: userId}, {audiophile: 1}).populate('audiophile')
}

function unfollowAudiophile(userId, audiophileId) {
    return audiophileFollowedModel.deleteOne({listener: userId, audiophile: audiophileId})
}

var api = {
    createFollow: createFollow,
    findByHash: findByHash,
    findFollowedAudiophilesForUser: findFollowedAudiophilesForUser,
    unfollowAudiophile: unfollowAudiophile
};

module.exports = api;