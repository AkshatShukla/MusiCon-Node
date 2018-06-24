var mongoose = require('mongoose');
var albumRecommendedSchema = require('./albumRecommended.schema.server');
var albumRecommendedModel = mongoose.model('AlbumRecommendedModel', albumRecommendedSchema);


function createFollow(userid,albumid) {
    return albumRecommendedModel.create({album:albumid,user:userid,hash:albumid+userid})
}
function findByHash(userid,albumid){
    return albumRecommendedModel.findOne({hash:albumid+userid})
}
var api = {
    createFollow:createFollow,
    findByHash:findByHash
};
module.exports = api;