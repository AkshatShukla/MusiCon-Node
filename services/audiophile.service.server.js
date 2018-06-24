module.exports = function (app) {

    app.post('/api/audiophile/track', recommendTrack);
    app.post('/api/audiophile/album', recommendAlbum);
    app.get('/api/audiophile', findAllAudiophile);
    app.post('/api/audiophile/:audiophileId', followAudiophile);
    app.get('/api/audiophile/album/:audiophileId', GetAlbums);
    app.get('/api/audiophile/track/:audiophileId', GetTracks);
    app.get('/api/audiophile/followedAudiophile', getFollowedAudiophilesForUser);
    app.delete('/api/audiophile/unfollowAudiophile', unfollowAudiophile);

    var trackModel = require('../models/track/track.model.server');
    var albumModel = require('../models/album/album.model.server');
    var audiophileFollowedModel = require('../models/audiophileFollowed/audiophileFollowed.model.server');
    var albumRecommendedModel = require('../models/albumRecommended/albumRecommended.model.server');
    var trackRecommendedModel = require('../models/trackRecommended/trackRecommended.model.server');
    var userModel = require('../models/user/user.model.server');

    function recommendTrack(req, res) {
        var track = req.body;
        var user = req.session.currentUser;
        var newTrack = {
            name: track.name,
            spotifyId: track.id,
            artist: track.artists[0].name,
            url: track.external_urls.spotify,
            imageUrl: (track.album.images.length !== 0 ? track.album.images[0].url : ''),
            duration: track.duration_ms,
            popularity: track.popularity,
            previewUrl: track.preview_url,

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
                                trackRecommendedModel.findByHash(req.session.userId, track._id)
                                    .then(hashFindResult => {
                                        if (hashFindResult === null) {
                                            trackRecommendedModel.createFollow(req.session.userId, track._id)
                                                .then(() => res.sendStatus(200))
                                        }
                                        else {
                                            res.sendStatus(501)
                                        }
                                    })
                            )
                    }
                    else {
                        trackRecommendedModel.findByHash(req.session.userId, queryresult._id)
                            .then(hashFindResult => {
                                if (hashFindResult === null) {
                                    trackRecommendedModel.createFollow(req.session.userId, queryresult._id)
                                        .then(() => res.sendStatus(200))
                                }
                                else {
                                    res.sendStatus(501)
                                }
                            })
                    }
                });
        }
    }

    function recommendAlbum(req, res) {
        var album = req.body;
        var user = req.session.currentUser;
        var newAlbum = {
            name: album.name,
            spotifyId: album.id,
            releaseDate: album.release_date,
            artist: album.artists[0].name,
            externalUrl: album.external_urls.spotify,
            imageUrl: (album.images.length !== 0 ? album.images[0].url : '')
        };
        if (user === undefined) {
            res.sendStatus(500);
        }
        else {
            albumModel.findAlbumBySpotifyId(newAlbum.spotifyId)
                .then(queryresult => {
                    if (queryresult === null) {
                        albumModel.createAlbum(newAlbum)
                            .then((album) =>
                                albumRecommendedModel.findByHash(req.session.userId, album._id)
                                    .then(hashFindResult => {
                                        if (hashFindResult === null) {
                                            albumRecommendedModel.createFollow(req.session.userId, album._id)
                                                .then(() => res.sendStatus(200))
                                        }
                                        else {
                                            res.sendStatus(501)
                                        }
                                    })
                            )
                    }
                    else {
                        albumRecommendedModel.findByHash(req.session.userId, queryresult._id)
                            .then(hashFindResult => {
                                if (hashFindResult === null) {
                                    albumRecommendedModel.createFollow(req.session.userId, queryresult._id)
                                        .then(() => res.sendStatus(200))
                                }
                                else {
                                    res.sendStatus(501)
                                }
                            })
                    }
                });
        }
    }

    function findAllAudiophile(req, res) {
        userModel.findAudiophile()
            .then(result => res.json(result));
    }

    function followAudiophile(req, res) {
        var user = req.session.currentUser;
        var audiophileId = req.params['audiophileId'];
        if (user === undefined) {
            res.sendStatus(500);
        }
        else {
            audiophileFollowedModel.findByHash(req.session.userId, audiophileId)
                .then(results => {
                    if (results) {
                        res.sendStatus(501);
                    }
                    else {
                        audiophileFollowedModel.createFollow(req.session.userId, audiophileId)
                            .then(() => {
                                res.sendStatus(200);
                            })
                    }
                })
        }

    }

    function GetAlbums(req, res) {
        albumRecommendedModel.findById(req.params['audiophileId'], 'album')
            .then(result => res.json(result));
    }

    function GetTracks(req, res) {
        trackRecommendedModel.findById(req.params['audiophileId'], 'track')
            .then(result => res.json(result));
    }

    function unfollowAudiophile(req, res) {
        var audiophile = req.body;
        var user = req.session.currentUser;
        audiophileFollowedModel.unfollowAudiophile(user._id, audiophile._id)
            .then(() => res.sendStatus(200))
    }

    function getFollowedAudiophilesForUser(req, res) {
        var user = req.session['currentUser'];
        var resultAudiophiles = [];
        audiophileFollowedModel.findFollowedAudiophilesForUser(user._id)
            .then((followedAudiophiles) => {
                followedAudiophiles.map((followedAudiophile) => {
                    resultAudiophiles.push(followedAudiophile.audiophile)
                });
                res.send(resultAudiophiles);
            })
            .catch(() => {
                res.sendStatus(501);
                res.send(resultAudiophiles);
            });
    }
};
