var mongoose = require('mongoose');
var audiophileFollowedSchema = require('./audiophileFollowed.schema.server');
var audiophileFollowedModel = mongoose.model('AudiophileFollowedModel', audiophileFollowedSchema);

function createFollow(userid,audiophileId) {
    return audiophileFollowedModel.create({audiophile:audiophileId,listener:userid,hash:audiophileId+userid})
}
function findByHash(userid,audiophileId){
    return audiophileFollowedModel.findOne({hash:audiophileId+userid})
}
var api = {
    createFollow:createFollow,
    findByHash:findByHash
};
module.exports = api;