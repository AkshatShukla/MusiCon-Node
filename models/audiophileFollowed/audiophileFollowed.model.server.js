var mongoose = require('mongoose');
var audiophileFollowedSchema = require('./audiophileFollowed.schema.server');
var audiophileFollowedModel = mongoose.model('AudiophileFollowedModel', audiophileFollowedSchema);


var api = {
};

module.exports = api;