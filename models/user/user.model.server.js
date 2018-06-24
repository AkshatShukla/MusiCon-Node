var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials, {username: 1, type: 1});
}

function findUserById(userId) {
    return userModel.findOne({_id: userId});
}

function createUser(user) {
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

function updateUser(id, user) {
    return userModel.updateOne({_id: id},
        user);
}

function updateUserEvent(id, event) {
    return userModel.update({_id: id}, {$push: {events: event._id}})
}

function deleteUserEvent(id, event) {
    return userModel.update({_id: id}, {$pull: {events: event._id}})
}

function findAllEventOfUser(user) {
    return userModel.findOne({_id: user._id}, {events: 1}).populate('events')
}

function updateUserPlayList(id, playlist) {
    return userModel.update({_id: id}, {$push: {playlist: playlist._id}})
}

function deleteUserPlaylist(id, playlist) {
    return userModel.update({_id: id}, {$pull: {playlist: playlist._id}})
}

function findAllPlaylistOfUser(user) {
    return userModel.findOne({_id: user._id}, {playlist: 1}).populate('playlist')
}

function findByUserName(username) {
    return userModel.findOne({username: username});
}
function deleteUser(id){
    return userModel.deleteOne({_id:id})
}

var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByCredentials: findUserByCredentials,
    updateUser: updateUser,
    findByUserName: findByUserName,
    updateUserEvent: updateUserEvent,
    findAllEventOfUser: findAllEventOfUser,
    deleteUserEvent: deleteUserEvent,
    updateUserPlayList: updateUserPlayList,
    findAllPlaylistOfUser: findAllPlaylistOfUser,
    deleteUserPlaylist: deleteUserPlaylist,
    deleteUser:deleteUser
};

module.exports = api;