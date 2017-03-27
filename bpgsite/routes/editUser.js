var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs-extra');
var http = require('https');
var databaseUrl = 'mongodb://heroku_8vg6ng9s:1oqbq7p3gmruleg8p07cpi94so@ds143340.mlab.com:43340/heroku_8vg6ng9s';
var db = require("mongojs")(databaseUrl);
var objectId = require('mongodb').ObjectID;
var userDb = db.collection('users');

router.get('/:id', function(req, res, next){
    var reqId = req.params.id;
    console.log(reqId);

    userDb.find({ "organiser": { $eq: "true" } }, function (err, result) {
        if (err) {
            console.log(err);
        }
        else if (result) {
            var organisers = result;
            //organisers.push(result);
            console.log(organisers);
            var firstName = result[reqId].firstName;
            var userInfo = result[reqId].userInfo;
            var userPhoto = result[reqId].userPhoto;
            var displayName = result[reqId].displayName;
            var id = result[reqId]._id;
            console.log(firstName);
            console.log(userInfo);
            console.log(userPhoto);
            console.log(id);
            if (req.user != undefined && displayName == req.user.displayName) {
                var edit = "true";
                console.log(edit);
               
            } else {
                var edit = "false";
                console.log(edit);
            }

            res.render('edit', {

                title: 'Edit User',
                user: req.user,
                firstName: firstName,
                userInfo: userInfo,
                userPhoto: userPhoto,
                id: reqId,
                edit: edit
            });
        }
    });
});



/*    var userData = {
                                firstName: '',
                                displayName: profile.displayName,
                                userInfo: '',
                                userPhoto: '',
                                username: profile.id,
                                provider: profile.provider,
                                providerIdentifierField: 'id'
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
                                        
                        */
        
 
                        
   /* var buffer = new Buffer(16);
    var buffer = id.toString('hexadecimal');
    console.log(id); 
    

    var site = new buffer("https://api.meetup.com/profile/1575517/");
    site = Buffer.concat([site,id]);
    console.log(site);
    request.get({
        url: site,
        uri: site.id,
        json: true,
        headers: { 'User-Agent': 'request' }
    }, (err, res, data) => {

        if (err) {
            console.log('Error:', err);
        } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
        } else {
            var file = JSON.stringify(data, null, 2);

            var userRSVPs = []
            userRSVPs = file;
            
            console.log(file);
        };
    }); */
    /*
    Strategy.prototype.userProfile = function (token, tokenSecret, params, done) {
        this._oauth.get('https://api.meetup.com/2/members?member_id=self', token, tokenSecret, function (err, body, res) {
            if (err) { return done(new InternalOAuthError('failed to fetch user profile', err)); }

            try {
                var json = JSON.parse(body);

                var memProfile = { provider: 'meetup' };
                memProfile.id = json.results[0].id
                memProfile.displayName = json.results[0].name;

                memProfile._raw = body;
                memProfile._json = json;

                done(null, memProfile);
            } catch (e) {
                done(e);
            }
        });

        
        res.render('user', {

            title: 'User Page',
            user: req.user,
            firstName: firstName,
            userInfo: userInfo,
            userPhoto: userPhoto 
        });
        /*router.get('/get-data', function(req, res, next) {
            userDb.findOne({ "username": { $eq: id } }, function (err, result) {
        if (err) {
          console.log(err);
        }
        else if (result) {
          console.log(result);
          console.log("User is already in database!");
        }
        });

        router.post('/update', function(req, res, next) { */
/* var userData = {
            firstName: '',
            displayName: profile.displayName,
            userInfo: '',
            userPhoto: '',
            username: profile.id,
            provider: profile.provider,
            providerIdentifierField: 'id'
          }; 
          console.log("User is not in database");
          /*
          userDb.insert(userData, function (err, results) {
            if (err) {
              console.log(err);
            } 
        }); 
});
  }
*/
router.post('/:id', function(req, res, next) {
    var reqId = req.params.id;
    console.log(reqId);

    userDb.find({ "organiser": { $eq: "true" } }, function (err, result) {
        if (err) {
            console.log(err);
        }
        else if (result) {
            var organisers = result;
            //organisers.push(result);
            console.log(organisers);
            var firstName = result[reqId].firstName;
            var userInfo = result[reqId].userInfo;
            var userPhoto = result[reqId].userPhoto;
            var displayName = result[reqId].displayName;
            var id = result[reqId]._id;
            console.log(firstName);
            console.log(userInfo);
            console.log(userPhoto);
            console.log(id);
            if (req.user != undefined && displayName == req.user.displayName) {
    
     userData = {
        firstName: req.body.firstName,
        userInfo: req.body.userInfo,
        userPhoto: req.body.userPhoto
        };
        
        console.log(userData);
        if (req.body.firstName == '') {
            userData.firstName = firstName;
        }
        if (req.body.userInfo == '') {
            userData.userInfo = userInfo;
        }
        if (req.body.userPhoto == '') {
            userData.userPhoto = userPhoto;
        }
        console.log(userData);
        userDb.update({"_id": objectId(id)}, {$set: userData}, function (err, results) {
            if (err) {
              console.log(err);
            }
            else if (results) {
              console.log(results);
            }
    });
    
res.redirect(302, '/meet' );
        }
    }
    });
});  

module.exports = router;