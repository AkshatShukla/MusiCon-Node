var mongoose = require('mongoose');
var likeAlbumSchema = require('./likeAlbum.schema.server');
var likeAlbumModel = mongoose.model('LikeAlbumModel', likeAlbumSchema);


var api = {
};

module.exports = api;