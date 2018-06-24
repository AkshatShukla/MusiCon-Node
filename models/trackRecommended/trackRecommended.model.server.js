var mongoose = require('mongoose');
var trackRecommendedSchema = require('./trackRecommended.schema.server');
var trackRecommendedModel = mongoose.model('TrackRecommendedModel', trackRecommendedSchema);

function createFollow(userid,trackid) {
    return trackRecommendedModel.create({track:trackid,user:userid,hash:trackid+userid})
}
function findByHash(userid,trackid){
    return trackRecommendedModel.findOne({hash:trackid+userid})
}
function findById(id,type){
    return trackRecommendedModel.find({user:id}).populate(type)
}
var api = {
    createFollow:createFollow,
    findByHash:findByHash,
    findById:findById
};
module.exports = api;