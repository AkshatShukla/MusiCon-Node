module.exports = function (app) {

    app.post('/api/playlist', createPlaylist);
    app.get('/api/playlists', findAllPlaylistOfUser);
    app.delete('/api/playlist/:playlistId', deletePlaylist);
    app.get('/api/playlist/:playlistId/tracks', getTracksInPlaylist);

    var playlistModel = require('../models/playlist/playlist.model.server');
    var userModel = require('../models/user/user.model.server');



    function createPlaylist(req, res) {
        var playlist = req.body;
        var user = req.session.currentUser;

        playlistModel.createPlaylist(playlist)
            .then(response => {
                userModel.updateUserPlayList(user._id, response)
                    .then(response1 => res.sendStatus(200))
            });
    }

    function findAllPlaylistOfUser(req, res) {
        var user = req.session.currentUser;

        userModel.findAllPlaylistOfUser(user)
            .then(response => res.json(response));
    }

    function deletePlaylist(req, res) {
        var playlistId = req.params['playlistId'];
        var user = req.session.currentUser;

        playlistModel.deletePlaylist({_id: playlistId})
            .then(() => {
                userModel.deleteUserPlaylist({_id: user._id}, {_id: playlistId})
                    .then(() => res.sendStatus(200))
            })
    }

    function getTracksInPlaylist(req, res) {
        var playListId = req.params['playlistId'];

        playlistModel
            .getTracksInPlaylist({_id: playListId})
            .then(response => res.json(response))
    }
}
