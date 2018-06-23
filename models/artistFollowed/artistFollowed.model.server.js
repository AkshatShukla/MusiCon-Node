var mongoose = require('mongoose');
var artistFollowedSchema = require('./artistFollowed.schema.server');
var artistFollowedModel = mongoose.model('ArtistFollowedModel', artistFollowedSchema);


function createFollow(userid,artistid) {
    return artistFollowedModel.create({artist:artistid,user:userid,hash:artistid+userid})
}
function findByHash(userid,artistid){
    return artistFollowedModel.findOne({hash:artistid+userid})
}
var api = {
    createFollow:createFollow,
    findByHash:findByHash
};
module.exports = api;