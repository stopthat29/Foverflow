var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')(expressSession);
var mongoose = require('mongoose');
require('./models/users_model.js');
var conn = mongoose.connect('mongodb://temp:temp@ds045001.mongolab.com:45001/captinslow');
var app = express();
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    secret: 'SECRET',
    cookie: {maxAge: 60*60*1000},
    db: new mongoStore({mongooseConnection: mongoose.connection})
}));
require('./routes')(app);
require('./google_auth')(app);
app.listen(8080);