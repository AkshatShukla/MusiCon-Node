var mongoose = require('mongoose');
var likeTrackSchema = require('./likeTrack.schema.server');
var likeTrackModel = mongoose.model('LikeModel', likeTrackSchema);

function createLike(userId, trackId) {
    return likeTrackModel.create({track: trackId, user: userId,hash: trackId+userId})
}
function findByHash(userId, trackId){
    return likeTrackModel.findOne({hash: trackId+userId})
}

function findLikedTrackForUser(userId) {
    return likeTrackModel.find({user: userId}, {track: 1}).populate('track')
}

function dislikeTrack(userId, trackId) {
    return likeTrackModel.deleteOne({user: userId, track: trackId})
}

var api = {
    createLike: createLike,
    findByHash:findByHash,
    findLikedTrackForUser: findLikedTrackForUser,
    dislikeTrack: dislikeTrack
};

module.exports = api;