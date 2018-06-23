module.exports = function (app) {

    app.post('/api/likeTrack', likeTrack);
    app.get('/api/likedTracks', getLikedTracks);
    app.delete('/api/dislikeTrack', dislikeTrack);

    var trackModel = require('../models/track/track.model.server');
    var likeTrackModel = require('../models/likeTrack/likeTrack.model.server');


    function likeTrack(req, res) {
        var track = req.body;
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
                                likeTrackModel.findByHash(req.session.userId, track._id)
                                    .then(hashFindResult =>{
                                        if(hashFindResult===null){
                                            likeTrackModel.createLike(req.session.userId, track._id)
                                                .then(()=> res.sendStatus(200))
                                        }
                                        else{
                                            res.sendStatus(501)
                                        }
                                    })
                            )
                    }
                    else {
                        likeTrackModel.findByHash(req.session.userId, queryresult._id)
                            .then(hashFindResult =>{
                                if(hashFindResult===null){
                                    likeTrackModel.createLike(req.session.userId, queryresult._id)
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

    function dislikeTrack(req, res) {
        var track = req.body;
        var user = req.session.currentUser;
        likeTrackModel.dislikeTrack(user._id, track._id)
            .then(() => res.sendStatus(200))
    }

    function getLikedTracks(req, res) {
        var user = req.session['currentUser'];
        var resultTracks = [];
        likeTrackModel.findLikedTrackForUser(user._id)
            .then((likedTracks) => {
                likedTracks.map((likedTrack) => {
                    resultTracks.push(likedTrack.track)
                });
                res.send(resultTracks);
            })
            .catch(() => {
                res.sendStatus(501);
                res.send(resultTracks);
            });
    }
};
