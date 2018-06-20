var userSchema = require('./user.schema.server');

var audiophileSchema = userSchema.extend({
    followers : Number
});

module.exports = audiophileSchema;