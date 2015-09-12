var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var masterUsr = require('./controllers/master_usr_controller');
passport.use(new GoogleStrategy({
        clientID: "395625805842-io9psp81i1nikne6aaphq60deh6h2h42.apps.googleusercontent.com",
        clientSecret: "ir4rGCEPbdAuuatqhRSAMQmY",
        callbackURL: "http://127.0.0.1:8080/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        //console.log(profile);
      //  console.log(User);
        //User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //    return done(err, user);
        //});
        //console.log(profile);
        //console.log(profile._json.organizations);
        //console.log(profile._json.placesLived);
        masterUsr.saveGoogleMasterUser(profile);
        return done(null, profile);


    }
));
passport.serializeUser(function (user, done) {
    //console.log(user);
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    //console.log(obj);
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
        passport.authenticate('google', { failureRedirect: '/login', successRedirect: '/ginfo' })
        );
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/login');
    });
    app.get('/ginfo', function (req, res) {
        if (req.isAuthenticated()) {
            res.render('ginfo', {user: req.user});
        } else {
            res.redirect('/login');

        }
    });
};







