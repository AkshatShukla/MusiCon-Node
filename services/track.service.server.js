module.exports = function (app) {

    app.post('/api/likeTrack', createTrack);

    var trackModel = require('../models/track/track.model.server');
    var likeTrack = require('../models/likeTrack/likeTrack.model.server');


    function createTrack(req, res) {
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
                                likeTrack.findByHash(req.session.userId, track._id)
                                    .then(hashFindResult =>{
                                        if(hashFindResult===null){
                                            likeTrack.createLike(req.session.userId, track._id)
                                                .then(()=> res.sendStatus(200))
                                        }
                                        else{
                                            res.sendStatus(200)
                                        }
                                    })
                            )
                    }
                    else {
                        likeTrack.findByHash(req.session.userId, track._id)
                            .then(hashFindResult =>{
                                if(hashFindResult===null){
                                    likeTrack.createLike(req.session.userId, track._id)
                                        .then(()=> res.sendStatus(200))
                                }
                                else{
                                    res.sendStatus(200)
                                }
                            })
                    }
                });
        }

    }
}
