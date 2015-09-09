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
mongoose.model('User', UserSchema);
