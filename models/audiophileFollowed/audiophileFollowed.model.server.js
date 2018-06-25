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
function dell(id){
    return audiophileFollowedModel.remove({listener:id})
}
function dela(id){
    return audiophileFollowedModel.remove({audiophile:id})
}
var api = {
    createFollow: createFollow,
    findByHash: findByHash,
    findFollowedAudiophilesForUser: findFollowedAudiophilesForUser,
    unfollowAudiophile: unfollowAudiophile,
    dell:dell,
    dela:dela
};

module.exports = api;