var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var Flickr = require("flickrapi");

 var index = require('./routes/index');

var users = require('./routes/users');
var events = require('./routes/events');
var meet = require('./routes/meet');
var signin = require('./routes/signin');

var mongoose = require('mongoose');

//require passport
var passport = require('passport');
//express session
var expressSession = require('express-session');
var flash = require('connect-flash');
var connectMongo = require('connect-mongo');
var MongoStore = connectMongo(expressSession);

var config = require('./config');
//var restrict = require('./auth/restrict');
var passportConfig = require('./auth/passport-config');
passportConfig();

var app = express();
mongoose.connect(config.mongoUri);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//saveUninitialized - create a session if nothing has been stored in it yet
//resave - resave a session that has not been modified

app.use(expressSession(
    {
        secret: 'private-key',
        saveUninitialized: false, 
        resave: false,
        store: new MongoStore({
            mongooseConnection:mongoose.connection
        })
    }
));
app.use(flash());
//put it before routes - so that we can allow/disallow certain routes
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);
//app.use(restrict);
app.use('/events', events);
app.use('/meet', meet);
app.use('/signin', signin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
