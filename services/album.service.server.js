module.exports = function (app) {

    app.post('/api/likeAlbum', likeAlbum);
    app.get('/api/likedAlbums', getLikedAlbums);
    app.get('/api/recommendedAlbums', getRecommendedAlbums);
    app.delete('/api/dislikeAlbum', dislikeAlbum);
    app.delete('/api/unrecommendAlbum', removeRecommendedAlbum);

    var albumModel = require('../models/album/album.model.server');
    var likeAlbumModel = require('../models/likeAlbum/likeAlbum.model.server');
    var recommendedAlbumsModel = require('../models/albumRecommended/albumRecommended.model.server');


    function likeAlbum(req, res) {
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
                                likeAlbumModel.findByHash(req.session.userId, album._id)
                                    .then(hashFindResult =>{
                                        if(hashFindResult===null){
                                            likeAlbumModel.createLike(req.session.userId, album._id)
                                                .then(()=> res.sendStatus(200))
                                        }
                                        else{
                                            res.sendStatus(501)
                                        }
                                    })
                            )
                    }
                    else {
                        likeAlbumModel.findByHash(req.session.userId, queryresult._id)
                            .then(hashFindResult =>{
                                if(hashFindResult===null){
                                    likeAlbumModel.createLike(req.session.userId, queryresult._id)
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

    function dislikeAlbum(req, res) {
        var album = req.body;
        var user = req.session.currentUser;
        likeAlbumModel.dislikeAlbum(user._id, album._id)
            .then(() => res.sendStatus(200))
    }

    function getLikedAlbums(req, res) {
        var user = req.session['currentUser'];
        var resultAlbums = [];
        likeAlbumModel.findLikedAlbumForUser(user._id)
            .then((likedAlbums) => {
                likedAlbums.map((likedAlbum) => {
                    resultAlbums.push(likedAlbum.Album)
                });
                res.send(resultAlbums);
            })
            .catch(() => {
                res.sendStatus(501);
                res.send(resultAlbums);
            });
    }

    function removeRecommendedAlbum(req, res) {
        var album = req.body;
        var user = req.session.currentUser;
        recommendedAlbumsModel.removeRecommendedAlbum(user._id, album._id)
            .then(() => res.sendStatus(200))
    }

    function getRecommendedAlbums(req, res) {
        var user = req.session['currentUser'];
        var resultAlbums = [];
        recommendedAlbumsModel.findRecommendedAlbumsForUser(user._id)
            .then((recommendedAlbums) => {
                recommendedAlbums.map((recommendedAlbum) => {
                    resultAlbums.push(recommendedAlbum.album)
                });
                res.send(resultAlbums);
            })
            .catch(() => {
                res.sendStatus(501);
                res.send(resultAlbums);
            });
    }
};
