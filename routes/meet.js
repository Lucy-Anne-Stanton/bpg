/**
 * This route allows the user to view information regarding the organisers
 **/

var express = require('express');
var router = express.Router();
var truncate = require('truncate-html');
var databaseUrl = 'mongodb://BPG_admin:Uwe31608Password@ds031608.mlab.com:31608/bpg';
var db = require("mongojs")(databaseUrl);
var userDb = db.collection('users');
/* GET Meet the Organisers page. */


router.get('/', function (req, res, next) {

    //Array to store organiser info
    var orgArray = [];
    // For each event...

    // Find the user in the database who has an organiser role.
    userDb.find({
        "organiser": {
            $eq: "true"
        }
    }, function (err, result) {
        // If there is an error, display the error
        if (err) {
            console.log(err);
        }
        // Else, take the list of organisers,
        else if (result) {
            var organisers = result;
            // For each organiser in database, give the data a variable
            for (var i = 0, len = organisers.length; i < len; i++) {
                var firstName = result[i].firstName;
                var userInfo = result[i].userInfo;
                var userPhoto = result[i].userPhoto;
                var displayName = result[i].displayName;
                //Find the organiser's info and truncate it
                var oinfo = truncate(userInfo, 140);
                // Push the details into the array
                orgArray.push({
                    firstName: firstName,
                    userInfo: oinfo,
                    userPhoto: userPhoto,
                    displayName: displayName
                });
            }
            // Render the page and send the organisers' details
            res.render('meet', {
                title: 'Meet the Organisers',
                user: req.user,
                organisers: orgArray
            });
        }
    });
});

module.exports = router;