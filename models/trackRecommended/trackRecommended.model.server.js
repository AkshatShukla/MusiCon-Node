var mongoose = require('mongoose');
var trackRecommendedSchema = require('./trackRecommended.schema.server');
var trackRecommendedModel = mongoose.model('TrackRecommendedModel', trackRecommendedSchema);

function createFollow(userId, trackId) {
    return trackRecommendedModel.create({track: trackId, user: useriI, hash: trackId + userId})
}

function findByHash(userId, trackId) {
    return trackRecommendedModel.findOne({hash: trackId + userId})
}

function findById(id, type) {
    return trackRecommendedModel.find({user: id}).populate(type)
}

function findRecommendedTracksForUser(userId) {
    return trackRecommendedModel.find({user: userId}).populate('track')
}

function removeRecommendedTrack(userId, trackId) {
    return trackRecommendedModel.deleteOne({user: userId, track: trackId})
}

var api = {
    createFollow: createFollow,
    findByHash: findByHash,
    findById: findById,
    findRecommendedTracksForUser: findRecommendedTracksForUser,
    removeRecommendedTrack: removeRecommendedTrack
};
module.exports = api;