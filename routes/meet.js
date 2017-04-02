/**
 * This route allows the user to view information regarding the organisers
**/

var express = require('express');
var router = express.Router();
var databaseUrl = 'mongodb://BPG_admin:Uwe31608Password@ds031608.mlab.com:31608/bpg';
var db = require("mongojs")(databaseUrl);
var userDb = db.collection('users');
/* GET Meet the Organisers page. */

router.get('/', function (req, res, next) {
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

            // Render the page and send the organisers' details

            res.render('meet', {
                title: 'Meet the Organisers',
                user: req.user,
                organisers: organisers
            });
        }
    });
});

module.exports = router;