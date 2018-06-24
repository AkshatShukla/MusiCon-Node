module.exports = function (app) {

    app.post('/api/playlist', createPlaylist);
    app.get('/api/playlists', findAllPlaylistOfUser);
    app.delete('/api/playlist/:playlistId', deletePlaylist);
    app.get('/api/playlist/:playlistId/tracks', getTracksInPlaylist);
    app.post('/api/playlist/:playlistId/addtrack', addTrackToPlaylist);
    app.delete('/api/playlist/:playlistId/track/:trackId', deleteTrackFromPlaylist)

    var playlistModel = require('../models/playlist/playlist.model.server');
    var userModel = require('../models/user/user.model.server');
    var trackModel = require('../models/track/track.model.server');



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

    function deleteTrackFromPlaylist(req, res) {
        var playlistId = req.params['playlistId'];
        var trackId = req.params['trackId'];

        playlistModel
            .deleteTrackFromPlaylist({_id: playlistId}, {_id: trackId})
            .then(() => res.sendStatus(200))
    }

    function getTracksInPlaylist(req, res) {
        var playListId = req.params['playlistId'];

        playlistModel
            .getTracksInPlaylist({_id: playListId})
            .then(response => res.json(response))
    }

    function addTrackToPlaylist(req, res) {
        var track = req.body;
        var playlistId = req.params['playlistId'];
        var user = req.session.currentUser;
        var newTrack = {
            name: track.name,
            spotifyId: track.id,
            artist: track.artists[0].name,
            url: track.external_urls.spotify,
            imageUrl: (track.album.images.length !== 0 ? track.album.images[0].url : ''),
            duration:track.duration_ms,
            popularity:track.popularity,
            previewUrl:track.preview_url,

        };
        if (user === undefined) {
            res.sendStatus(500);
        }
        else {
            trackModel.findTrackBySpotifyId(newTrack.spotifyId)
                .then(queryresult => {
                    if (queryresult === null) {
                        trackModel.createTrack(newTrack)
                            .then((track) =>
                                playlistModel
                                    .addTrackToPlaylist({_id: playlistId}, track)
                                    .then(() => res.sendStatus(200))
                            )
                    }
                    else {
                        playlistModel.isTrackPresentInPlaylist({_id: playlistId}, {_id: queryresult._id})
                            .then(hashFindResult =>{
                                if(hashFindResult===null){
                                    playlistModel
                                        .addTrackToPlaylist({_id: playlistId}, queryresult)
                                        .then(()=> res.sendStatus(200))
                                }
                                else{
                                    res.sendStatus(501)
                                }
                            })
                    }
                });
        }
    }
}
