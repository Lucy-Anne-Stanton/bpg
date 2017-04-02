/** 
 * This route enables the organiser information to be displayed to the user
**/

var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs-extra');
var http = require('https');
var databaseUrl = 'mongodb://BPG_admin:Uwe31608Password@ds031608.mlab.com:31608/bpg';
var db = require("mongojs")(databaseUrl);
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

            var organisers = result;
            //organisers.push(result);
            var firstName = result[reqId].firstName;
            var userInfo = result[reqId].userInfo;
            var userPhoto = result[reqId].userPhoto;
            var displayName = result[reqId].displayName;
            // If the requested user is not undefined and their name matches the requested user's name...
            if (req.user != undefined && displayName == req.user.displayName) {
                var edit = "true";
            } else {
                var edit = "false";
            }
            // Render the page with the required data
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


module.exports = router;
