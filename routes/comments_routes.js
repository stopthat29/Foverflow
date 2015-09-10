/**
 * Created by Malamute on 9/9/15.
 */
var express = require('express');
module.exports = function(app){
    var photos = require('./controllers/photos_controller');
    var comments = require('./controllers/comments_controller');
    var pages = require('./controllers/pages_controller');
    app.use('/static', express.static('../static')).
        use('/images', express.static('../images')).
        use('/lib', express.static('../lib'));

    app.get('/', function (req, res) {
        res.render('photos');
    });
    app.get('/photos', photos.getPhotos);
    app.get('/photo', photos.getPhoto);
    app.get('/pages', pages.getPage);
    app.get('/comments/get', comments.getComment);
    app.get('/comments/add', comments.addComment);

}