var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
        clientID: "395625805842-io9psp81i1nikne6aaphq60deh6h2h42.apps.googleusercontent.com",
        clientSecret: "ir4rGCEPbdAuuatqhRSAMQmY",
        callbackURL: "http://127.0.0.1:8080/auth/google/cback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));
passport.serializeUser(function (user, done) {
    console.log(user);
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    console.log(obj);
    done(null, obj);
});
module.exports = function (app) {

//========MiddleWare========
    console.log("Inclueded external middleware");
    app.use(passport.initialize());
    app.use(passport.session());

//========Routes===========
    app.get('/auth/google',
        passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
            console.log(res);
            // Successful authentication, redirect home.
            res.redirect('/');
        });
    app.get('/glogout', function (req, res) {
        req.logout();
        res.redirect('/login');
    });
    app.get('/ginfo', function (req, res) {
        if (req.isAuthenticated()) {
            res.render('ginfo', {user: req.user});
        } else {
            res.redirect('/glogin');

        }
    });
};







