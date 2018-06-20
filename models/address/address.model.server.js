var mongoose = require('mongoose');
var addressSchema = require('./address.schema.server');
var addressModel = mongoose.model('AddressModel', addressSchema);


var api = {
};

module.exports = api;