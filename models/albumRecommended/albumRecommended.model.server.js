var mongoose = require('mongoose');
var albumRecommendedSchema = require('./albumRecommended.schema.server');
var albumRecommendedModel = mongoose.model('AlbumRecommendedModel', albumRecommendedSchema);


function createFollow(userid,albumid) {
    return albumRecommendedModel.create({album:albumid,user:userid,hash:albumid+userid})
}

function findByHash(userid,albumid){
    return albumRecommendedModel.findOne({hash:albumid+userid})
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

var api = {
    createFollow: createFollow,
    findByHash: findByHash,
    findById: findById,
    findByHash: findByHash,
    findAll: findAll,
    deleteRecommendedAlbum: deleteRecommendedAlbum
};
module.exports = api;