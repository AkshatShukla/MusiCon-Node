var mongoose = require('mongoose');
var likeAlbumSchema = require('./likeAlbum.schema.server');
var likeAlbumModel = mongoose.model('LikeAlbumModel', likeAlbumSchema);

function createLike(userid,albumid) {
    return likeAlbumModel.create({Album:albumid,user:userid,hash:albumid+userid})
}
function findByHash(userid,albumid){
    return likeAlbumModel.findOne({hash:albumid+userid})
}

var api = {

    createLike: createLike,
    findByHash:findByHash
};

module.exports = api;