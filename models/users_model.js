/**
 * Created by Malamute on 9/7/15.
 */
var mongoose = require('mongoose');
    Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: { type: String, unique: true},
    email: String,
    color: String,
    hashed_password: String
});


var MasterUserSchema = new Schema({
    _gid: {type: String},
    _tid: {type: String},
    _fid: {type: String},

    googleAcc: [GoogleUserSchema]

});

var GoogleUserSchema = new Schema({
    provider: String,
    id: String,
    displayName: String,
    name: {familyName: String, givenName: String},
    photos: [{value: String}],
    gender: String,
    _raw: String,
    _json: {
        kind: String,
        etag: String,
        gender: String,
        objectType: String,
        id: String,
        displayName: String,
        name: {familyName: String, givenName: String},
        url: String,
        image: {
            url: String,
            isDefault: Boolean
        },
        //organizations: String,
        //placesLived:String,
        isPlusUser: Boolean,
        language: String,
        ageRange: {min: Number},
        circledByCount: Number,
        verified: Boolean
    }
});


mongoose.model('User', UserSchema);
mongoose.model('MasterUsrSchema', MasterUserSchema);
mongoose.model('GoogleUsrSchema', GoogleUserSchema);

