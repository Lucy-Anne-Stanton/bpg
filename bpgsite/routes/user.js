var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs-extra');
var http = require('https');
var databaseUrl = 'mongodb://BPG_admin:Uwe31608Password@ds031608.mlab.com:31608/bpg';
var db = require("mongojs")(databaseUrl);
var userDb = db.collection('users');

router.get('/:id', function (req, res, next) {

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
            console.log(firstName);
            console.log(userInfo);
            console.log(userPhoto);
            if (req.user != undefined && displayName == req.user.displayName) {
                var edit = "true";
                console.log(edit);
            } else {
                var edit = "false";
                console.log(edit);
            }

            res.render('user', {

                title: 'User Page',
                user: req.user,
                firstName: firstName,
                userInfo: userInfo,
                userPhoto: userPhoto,
                edit: edit,
                id: reqId
            });
        }
    });

});

router.post('/edit/:id', function(req, res, next){
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
               /*
               var userData = {
            firstName: 'req.body.firstName',
            userInfo: 'req.body.userInfo',
            userPhoto: 'req.body.userPhoto'
          };

          var id = 
               userDb.update(userData, function (err, results) {
            if (err) {
              console.log(err);
            }
            else if (results) {
              console.log(results);
            }
    }); */
            } else {
                var edit = "false";
                console.log(edit);
            }

            res.render('edit', {

                title: 'Edit User Page',
                user: req.user,
                firstName: firstName,
                userInfo: userInfo,
                userPhoto: userPhoto,
                edit: edit
            });
        }
    });
});

module.exports = router;
