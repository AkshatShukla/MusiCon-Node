var mongoose = require('mongoose');
var likeTrackSchema = require('./likeTrack.schema.server');
var likeTrackModel = mongoose.model('LikeModel', likeTrackSchema);

function createLike(userid,trackid) {
    return likeTrackModel.create({track:trackid,user:userid,hash:trackid+userid})
}
function findByHash(userid,trackid){
    return likeTrackModel.findOne({hash:trackid+userid})
}
var api = {
    createLike: createLike,
    findByHash:findByHash
};

module.exports = api;