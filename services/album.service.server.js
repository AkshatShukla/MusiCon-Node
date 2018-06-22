module.exports = function (app) {

    app.post('/api/likeAlbum', createAlbum);

    var albumModel = require('../models/album/album.model.server');
    var likeAlbum = require('../models/likeAlbum/likeAlbum.model.server');


    function createAlbum(req, res) {
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
                                likeAlbum.findByHash(req.session.userId, album._id)
                                    .then(hashFindResult =>{
                                        if(hashFindResult===null){
                                            likeAlbum.createLike(req.session.userId, album._id)
                                                .then(()=> res.sendStatus(200))
                                        }
                                        else{
                                            res.sendStatus(501)
                                        }
                                    })
                            )
                    }
                    else {
                        likeAlbum.findByHash(req.session.userId, queryresult._id)
                            .then(hashFindResult =>{
                                if(hashFindResult===null){
                                    likeAlbum.createLike(req.session.userId, queryresult._id)
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
