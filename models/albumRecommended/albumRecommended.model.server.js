var mongoose = require('mongoose');
var albumRecommendedSchema = require('./albumRecommended.schema.server');
var albumRecommendedModel = mongoose.model('AlbumRecommendedModel', albumRecommendedSchema);


function createFollow(userId, albumId) {
    return albumRecommendedModel.create({album: albumId, user: userId, hash: albumId + userId})
}

function findByHash(userId, albumId) {
    return albumRecommendedModel.findOne({hash: albumId + userId})
}

function findById(id,type){
    return albumRecommendedModel.find({user:id}).populate(type)
}

function findAll() {
    return albumRecommendedModel.find().populate('album user')
}

function deleteRecommendedAlbum(id) {
    return albumRecommendedModel.remove({_id: id})
}


function findRecommendedAlbumsForUser(userId) {
    return albumRecommendedModel.find({user: userId}).populate('album')
}

function removeRecommendedAlbum(userId, albumId) {
    return albumRecommendedModel.deleteOne({user: userId, album: albumId})
}

var api = {
    createFollow: createFollow,
    findByHash: findByHash,
    findById: findById,
    findAll: findAll,
    deleteRecommendedAlbum: deleteRecommendedAlbum,
    findRecommendedAlbumsForUser: findRecommendedAlbumsForUser,
    removeRecommendedAlbum: removeRecommendedAlbum
};
module.exports = api;