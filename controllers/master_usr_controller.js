/**
 * Created by Malamute on 9/10/15.
 */
var mongoose = require('mongoose'),
    MasterUsr = mongoose.model('MasterUsrSchema'),
    GoogleUsr = mongoose.model('GoogleUsrSchema');

exports.saveGoogleMasterUser = function (profile) {
    console.log(profile);

    MasterUsr.find({_gid: profile.id}).exec(function(err, docs){
        if(err){
            console.log(err);
        }else{
            console.log("Found a matching Document");
            return docs;
        }

        if(docs.length===0){
            var gProfile = new GoogleUsr({
                provider: profile.provider,
                id: profile.id,
                displayName: profile.displayName,
                name: {familyName: profile.name.familyName, givenName: profile.name.givenName},
                photos: [{value: profile.photos.value}],
                gender: profile.gender,
                _raw: profile._raw,
                _json: {
                    kind: profile._json.kind,
                    etag: profile._json.etag,
                    gender: profile._json.gender,
                    objectType: profile._json.objectType,
                    id: profile._json.id,
                    displayName: profile._json.displayName,
                    name: {familyName: profile._json.name.familyName, givenName: profile._json.name.givenName},
                    url: profile._json.url,
                    image: {
                        url: profile._json.image.url,
                        isDefault: profile._json.image.isDefault
                    },
                    //organizations: String,
                    //placesLived:String,
                    isPlusUser: profile.isPlusUser,
                    language: profile.language,
                    //ageRange: {min: profile.ageRange.min},
                    circledByCount: profile.circledByCount,
                    verified: profile.verified
                }
            });
            console.log(gProfile);
            var mstrUsr = new MasterUsr({
                _gid: profile.id,
                googleAcc: gProfile
            });

            mstrUsr.save(function (err, product, numberAffected) {
                if (err) {
                    console.log(err);
                }
                console.log(product);
                console.log(numberAffected);
            });
        }
    });





};