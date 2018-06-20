var mongoose = require('mongoose');
var albumSchema = require('./album.schema.server');
var albumModel = mongoose.model('AlbumModel', albumSchema);


var api = {
};

module.exports = api;