var mongoose = require('mongoose');
var artistListSchema = require('./artistList.schema.server');
var artistListModel = mongoose.model('ArtistListModel', artistListSchema);


var api = {
};

module.exports = api;