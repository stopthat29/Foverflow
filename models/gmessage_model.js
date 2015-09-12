/**
 * Created by Malamute on 9/10/15.
 */
/**
 *
 * Created by Malamute on 9/9/15.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var GreplySchema = new Schema({
    username: String,
    subject: String,
    timestamp: {type: Date, default: Date.now},
    body: String,
    replies: [ReplySchema]
}, {_id: true});
var GcommentThreadSchema = new Schema({
    title: String,
    replies: [ReplySchema]
});
mongoose.model('Greply', ReplySchema);
mongoose.model('GcommentThread', CommentThreadSchema);
