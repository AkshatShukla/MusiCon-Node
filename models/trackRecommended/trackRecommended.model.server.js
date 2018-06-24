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

function findAll() {
    return trackRecommendedModel.find().populate('track user')
}

function deleteRecommendedTrack(id) {
    return trackRecommendedModel.remove({_id: id})
}


function findRecommendedTracksForUser(userId) {
    return trackRecommendedModel.find({user: userId}).populate('track')
}

function removeRecommendedTrack(userId, trackId) {
    return trackRecommendedModel.deleteOne({user: userId, track: trackId})
}

var api = {
    createFollow:createFollow,
    findByHash:findByHash,
    findById:findById,
    findAll: findAll,
    deleteRecommendedTrack: deleteRecommendedTrack,
    findRecommendedTracksForUser: findRecommendedTracksForUser,
    removeRecommendedTrack: removeRecommendedTrack
};
module.exports = api;