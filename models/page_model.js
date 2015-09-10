/**
 * Created by Malamute on 9/9/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PageSchema = new Schema({
    name: {type: String, unique: true},
    commentID: Schema.ObjectId
});
mongoose.model('Page', PageSchema);
