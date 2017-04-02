/**
 * This allows the signed in organiser to edit their details
**/

var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs-extra');
var http = require('https');
var databaseUrl = 'mongodb://BPG_admin:Uwe31608Password@ds031608.mlab.com:31608/bpg';
var db = require("mongojs")(databaseUrl);
var objectId = require('mongodb').ObjectID;
var userDb = db.collection('users');

// Get the id in the uri. This will be used to find the details related to the organiser.

router.get('/:id', function (req, res, next) {
    var reqId = req.params.id;
    // Find the user in the database who has an organiser role.
    userDb.find({ "organiser": { $eq: "true" } }, function (err, result) {
        // If there is an error, display the error
        if (err) {
            console.log(err);
        }
        // Else, take the list of organisers,
        else if (result) {
            // add the organiser's firstName, userInfo, userPhoto and displayName to their variables by matching the id with the array number

            var firstName = result[reqId].firstName;
            var userInfo = result[reqId].userInfo;
            var userPhoto = result[reqId].userPhoto;
            var displayName = result[reqId].displayName;
            var id = result[reqId]._id;

            // If the requested user is not undefined and their name matches the requested user's name...
            if (req.user != undefined && displayName == req.user.displayName) {
                // allow them to edit
                var edit = "true";
                // Else, don't
            } else {
                var edit = "false";
            }
            // Render the page with the required data
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

// Post the id. This will be used to find the details related to the organiser.
router.post('/:id', function (req, res, next) {
    var reqId = req.params.id;
    // Find the user in the database who has an organiser role.
    userDb.find({ "organiser": { $eq: "true" } }, function (err, result) {
        // If there is an error, display the error
        if (err) {
            console.log(err);
        }
        // Else, take the list of organisers,
        else if (result) {
            // add the organiser's firstName, userInfo, userPhoto and displayName to their variables by matching the id with the array number

            var firstName = result[reqId].firstName;
            var userInfo = result[reqId].userInfo;
            var userPhoto = result[reqId].userPhoto;
            var displayName = result[reqId].displayName;
            var id = result[reqId]._id;

            // If the requested user is not undefined and their name matches the requested user's name...
            if (req.user != undefined && displayName == req.user.displayName) {
                // userData contains the data sent via the post request
                userData = {
                    firstName: req.body.firstName,
                    userInfo: req.body.userInfo,
                    userPhoto: req.body.userPhoto
                };
                // If firstName was left blank...
                if (req.body.firstName == '') {
                    // replace the userData with the original name
                    userData.firstName = firstName;
                }
                // If userInfo was left blank... 
                if (req.body.userInfo == '') {
                    // replace the userData with the original info
                    userData.userInfo = userInfo;
                }
                // If userPhoto was left blank... 
                if (req.body.userPhoto == '') {
                    // replace the userData with the original photo
                    userData.userPhoto = userPhoto;
                }
                // Update the user info in the database to the data sent

                userDb.update({ "_id": objectId(id) }, { $set: userData }, function (err, results) {
                    // If there is an error, display it
                    if (err) {
                        console.log(err);
                    }
                    // Else, display the results
                    else if (results) {
                        console.log(results);
                    }
                });
                // redirect the user to Meet the Organiser page on success
                res.redirect(302, '/meet');
            }
        }
    });
});

module.exports = router;