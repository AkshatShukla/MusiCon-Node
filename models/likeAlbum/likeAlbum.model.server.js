var mongoose = require('mongoose');
var likeAlbumSchema = require('./likeAlbum.schema.server');
var likeAlbumModel = mongoose.model('LikeAlbumModel', likeAlbumSchema);

function createLike(userId, albumId) {
    return likeAlbumModel.create({Album:albumId, user:userId, hash:albumId+userId})
}
function findByHash(userId, albumId){
    return likeAlbumModel.findOne({hash:albumId+userId})
}

function findLikedAlbumForUser(userId) {
    return likeAlbumModel.find({user: userId}, {Album: 1}).populate('Album')
}

function dislikeAlbum(userId, albumId) {
    return likeAlbumModel.deleteOne({user: userId, Album: albumId})
}

function findAll() {
    return likeAlbumModel.find().populate('Album user')
}

function deleteLikedAlbum(id) {
    return likeAlbumModel.remove({_id: id})
}
function del(id){
    return likeAlbumModel.deleteOne({user:id})
}

var api = {

    createLike: createLike,
    findByHash:findByHash,
    findLikedAlbumForUser: findLikedAlbumForUser,
    dislikeAlbum: dislikeAlbum,
    findAll: findAll,
    deleteLikedAlbum: deleteLikedAlbum,
    del:del
};

module.exports = api;