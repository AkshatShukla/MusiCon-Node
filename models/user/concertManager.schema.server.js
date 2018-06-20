var userSchema = require('./user.schema.server');

var concertManagerSchema = userSchema.extend({
    eventLocation: String
});

module.exports = concertManagerSchema;