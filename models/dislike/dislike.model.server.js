var mongoose = require('mongoose');
var dislikeSchema = require('./dislike.schema.server');
var dislikeModel = mongoose.model('DislikeModel', dislikeSchema);


var api = {
};

module.exports = api;