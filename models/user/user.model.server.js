var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var concertMangerSchema = require('./concertManager.schema.server');
var audiophileSchema = require('./audiophile.schema.server');
var musicListenerSchema = require('./musicListener.schema.server');
var userModel = mongoose.model('UserModel', userSchema);
var concertManagerModel = mongoose.model('ConcertManagerModel', concertMangerSchema);
var audiophileModel = mongoose.model('AudiophileModel', audiophileSchema);
var musicListenerModel = mongoose.model('MusicListenerModel', musicListenerSchema);

function findUserByCredentials(credentials) {
  return userModel.findOne(credentials, {username: 1});
}

function findUserById(userId) {
  return userModel.findOne({_id:userId});
}

function createUser(user) {
  return userModel.create(user);
}

function findAllUsers() {
  return userModel.find();
}
function updateUser(id,user){
    return userModel.updateOne({_id: id},
        user);
}
function findByUserName(username){
    return userModel.findOne({username:username});
}

var api = {
  createUser: createUser,
  findAllUsers: findAllUsers,
  findUserById: findUserById,
  findUserByCredentials: findUserByCredentials,
    updateUser:updateUser,
    findByUserName:findByUserName
};

module.exports = api;