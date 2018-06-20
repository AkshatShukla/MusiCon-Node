var mongoose = require('mongoose');
var artistSchema = require('./artist.schema.server');
var artistModel = mongoose.model('ArtistModel', artistSchema);


var api = {
};

module.exports = api;