var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var exphbs = require('express-handlebars');
require('dotenv').config();
var index = require('./routes/index');

var users = require('./routes/users');
var events = require('./routes/events');
var event = require('./routes/event');
var pastEvents = require('./routes/pastEvents');
var pastEvent = require('./routes/pastEvent');
var meet = require('./routes/meet');
var signin = require('./routes/signin');
var user = require('./routes/user');
var editUser = require('./routes/editUser');
var update = require('./routes/editUser');
var databaseUrl = 'mongodb://BPG_admin:Uwe31608Password@ds031608.mlab.com:31608/bpg';
var db = require("mongojs")(databaseUrl);
var userDb = db.collection('users');

var mongoose = require('mongoose');

//require passport
var passport = require('passport');

//express session
var expressSession = require('express-session');
var flash = require('connect-flash');
var connectMongo = require('connect-mongo');
var MongoStore = connectMongo(expressSession);

var util = require('util');
var MeetupStrategy = require('passport-meetup').Strategy;
var MEETUP_KEY = "v6jlg85o3iqqu8iealugph71tr";
var MEETUP_SECRET = "567qrgabj3oiv7l504i2b0c6o7";


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new MeetupStrategy({
  consumerKey: MEETUP_KEY,
  consumerSecret: MEETUP_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/meetup/callback"
},
  /*
  function(token, tokenSecret, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      console.log(profile);
      
      // To keep the example simple, the user's Meetup profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Meetup account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
  */
/* http://stackoverflow.com/questions/26575813/syntaxerror-unexpected-end-of-input-using-express-for-node-js */
  function (token, tokenSecret, profile, done) {
    process.nextTick(function () {
      var id = profile.id;
      //find item in database that matches username to the current profile.id
      /* http://stackoverflow.com/questions/11661545/how-to-get-a-callback-on-mongodb-collection-find */
      userDb.findOne({ "username": { $eq: id } }, function (err, result) {
        if (err) {
          console.log(err);
        }
        else if (result) {
          console.log(result);
          console.log("User is already in database!");
        }
        else {
          var userData = {
            firstName: '',
            displayName: profile.displayName,
            userInfo: '',
            userPhoto: '',
            username: profile.id,
            provider: profile.provider,
            providerIdentifierField: 'id',
            organiser: 'false'
          };
          console.log("User is not in database");
          userDb.insert(userData, function (err, results) {
            if (err) {
              console.log(err);
            }
            else if (results) {
              console.log(results);
            }
          });
        }

      });

      return done(null, profile);
    });
    /* // Set the provider data and include tokens
     
     var providerData = profile._json;
     providerData.accessToken = accessToken;
     providerData.refreshToken = refreshToken;
 
     // Create the user OAuth profile*/



  }));


var config = require('./config');


var meetupServices = require('./services/meetup');

//var restrict = require('./auth/restrict');
var passportConfig = require('./auth/passport-config');
passportConfig();

var app = express();

app.use('/assets', express.static(__dirname + '/public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));


var hbsHelpers = exphbs.create({
  helpers: require('handlebars-helpers')(),
  defaultLayout: 'layout',
  extname: 'hbs'
});

app.engine('hbs', hbsHelpers.engine);
app.set('view engine', 'hbs');



mongoose.connect(config.getDbConnectionString());


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({ secret: 'k657gb5dgha5uhnd6the4c3rf6', resave: true, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));

//saveUninitialized - create a session if nothing has been stored in it yet
//resave - resave a session that has not been modified


app.use(flash());
//put it before routes - so that we can allow/disallow certain routes
app.use(passport.initialize());
app.use(passport.session());


app.use(expressSession(
  {
    secret: 'private-key',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  }
));





app.get('/signin', function (req, res) {
  res.render('signin', { title: 'Sign In', user: req.user });
});

app.get('/auth/meetup',
  passport.authenticate('meetup'),
  function (req, res) {

  });

app.get('/auth/meetup/callback',
  passport.authenticate('meetup', { failureRedirect: '/login' }),
  function (req, res) {

    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.use('/', index);

var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController');
setupController(app);
apiController(app);

app.use('/users', users);
//app.use(restrict);
app.use('/events', events);
app.use('/event', event);
app.use('/past-events', pastEvents);
app.use('/past-event', pastEvent);
app.use('/meet', meet);
app.use('/signin', signin);
app.use('/user', user);
app.use('/edit', editUser);
app.use('/edit', update);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
