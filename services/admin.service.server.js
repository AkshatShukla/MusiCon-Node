module.exports = function (app) {

    app.get('/api/admin/user', getAllUsers);
    app.post('/api/admin/user', updateUser);
    app.delete('/api/admin/user/:userId',deleteUser);
    app.get('/api/admin/all-liked-album', allLikedAlbum);
    app.delete('/api/admin/likedAlbum/:likedAlbumId', deleteLikedAlbum);
    app.get('/api/admin/all-liked-track', allLikedTrack);
    app.delete('/api/admin/likedTrack/:likedTrackId', deleteLikedTrack);
    app.get('/api/admin/all-recommended-album', allRecommendedAlbum);
    app.delete('/api/admin/recommendedAlbum/:recommendedAlbumId', deleteRecommendedAlbum);
    app.get('/api/admin/all-recommended-track', allRecommendedTrack);
    app.delete('/api/admin/recommendedTrack/:recommendedTrackId', deleteRecommendedTrack);

    var userModel = require('../models/user/user.model.server');
    var likeAlbumModel = require('../models/likeAlbum/likeAlbum.model.server');
    var likeTrackModel = require('../models/likeTrack/likeTrack.model.server');
    var albumRecommendedModel = require('../models/albumRecommended/albumRecommended.model.server');
    var trackRecommendedModel = require('../models/trackRecommended/trackRecommended.model.server');

    function deleteUser(req,res){
        var id = req.params.userId;
        userModel.deleteUser(id)
            .then(() => res.sendStatus(200));

    }

    function getAllUsers(req, res) {
        var user = req.session.currentUser;
        if (user === undefined) {
            res.sendStatus(500);
        }
        else if (user.type !== 'Admin') {
            res.sendStatus(501);//not admin trying to get admin info
        }
        else {
            userModel.findAllUsers()
                .then(users => res.json(users))
        }
    }

    function updateUser(req,res){
        var user = req.body;
        if(user._id===undefined){
            createUser(user)
                .then(()=> res.sendStatus(201))
        }
        else{
            userModel.updateUser(user._id,user)
                .then(result => res.sendStatus(200))
        }
    }

    function createUser(user){
        return userModel.createUser(user);
    }

    function allLikedAlbum(req, res) {
        likeAlbumModel.findAll()
            .then((result) => res.json(result))
    }

    function deleteLikedAlbum(req, res) {
        var id = req.params['likedAlbumId'];
        likeAlbumModel.deleteLikedAlbum(id)
            .then(() => res.sendStatus(200))
    }

    function allLikedTrack(req, res) {
        likeTrackModel.findAll()
            .then((result) => res.json(result))
    }

    function deleteLikedTrack(req, res) {
        var id = req.params['likedTrackId'];
        likeTrackModel.deleteLikedTrack(id)
            .then(() => res.sendStatus(200))
    }

    function allRecommendedAlbum(req, res) {
        albumRecommendedModel.findAll()
            .then(result => res.json(result))
    }

    function deleteRecommendedAlbum(req, res) {
        var id = req.params['recommendedAlbumId'];
        albumRecommendedModel.deleteRecommendedAlbum(id)
            .then(() => res.sendStatus(200))
    }

    function allRecommendedTrack(req, res) {
        trackRecommendedModel.findAll()
            .then(result => res.json(result))
    }

    function deleteRecommendedTrack(req, res) {
        var id = req.params['recommendedTrackId'];
        trackRecommendedModel.deleteRecommendedTrack(id)
            .then(() => res.sendStatus(200))
    }
};
