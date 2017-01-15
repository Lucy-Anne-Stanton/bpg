var express = require('express');
var router = express.Router();
var restrict = require('../auth/restrict');

//var flickrApi = require('flickr-oauth-and-upload'); 
var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "5c0ef41286f23c65d07af970db2a8ff9",
      secret: "fe895383ed09539a",
      user_id: "124935905@N02",
      access_token: "72157677915266325-990edb5fa5ae5feb",
      access_token_secret: "fd71db2a0ec2e8e0"
    };



Flickr.authenticate(flickrOptions, function(error, flickr) {
  // we can now use "flickr" as our API object
});
/*
var myCallback = function (err, data) {
  if (!err) {
    // Now we have received authorized versions of
    // oauth token and oauth token secret
    console.log('oauthToken: ' + data.oauthToken);
    console.log('oauthTokenSecret: ' + data.oauthTokenSecret);
    console.log('userNsId: ' + data.userNsId);
    console.log('userName: ' + data.userName);
    console.log('fullName: ' + data.fullName);
  } else {
    console.log('error: ' + err);
  }
};

var args = {
  flickrConsumerKey: '5c0ef41286f23c65d07af970db2a8ff9',
  flickrConsumerKeySecret: 'fe895383ed09539a',
  oauthToken: '72157676293697121-464148214da923fb',
  oauthTokenSecret: '248af7fe012d3382',
  callback: myCallback
};

flickrApi.useRequestTokenToGetAccessToken(args); */


/* GET home page. */



router.get('/', function(req, res, next) {
  res.render('index', { 
     title: 'Home',
      firstName : req.user ? req.user.firstName : null,
      visitorNumber : req.session.visitorNumber
  });
});
/*
var myCallback = function (err, data) {
  if (!err) {
    console.log('Remember the credentials:');
    console.log('oauthToken: ' + data.oauthToken);
    console.log('oauthTokenSecret: ' + data.oauthTokenSecret);
    console.log('Ask user to go here for authorization: ' + data.url);
  } else {
    console.log('Error: ' + err);
  }
};

var args = {
  flickrConsumerKey: '5c0ef41286f23c65d07af970db2a8ff9',
  flickrConsumerKeySecret: 'fe895383ed09539a',
  permissions: 'write',
  redirectUrl: 'http://localhost:3000/bpg',
  callback: myCallback
};

flickrApi.getRequestToken(args);

router.get('/api/events',restrict,function(req,res,next){
    event.getEvents(function(err,events){
        if(err){
            return res.status(500).json({error:'Failed to retrieve events'});
        }
        res.json(events);
    })
})

router.get('/api/event-details/:eventId', function(req, res, next) {
    event.getEventDetails(req.params.eventId, function(err, event) {
        if (err) {
            return res.status(500).json({error: 'Failed to retrieve details'});
        }
        res.json(event);
    });
}); */

module.exports = router;