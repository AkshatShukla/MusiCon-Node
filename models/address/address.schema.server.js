var mongoose = require('mongoose');

var addressSchema = mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zip: String,
    primary: Boolean
}, {collection: 'address'});
module.exports = addressSchema;