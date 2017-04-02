/**
 * This route enables the past events to be displayed
**/

var express = require('express');
var router = express.Router();
var truncate = require('truncate-html');

var json = require('../public/json/pastEvents.json');
// The events are added to an events array
var pastEvents = []
pastEvents = json;

// Create an array to store the required data into
var descArray = [];
// For each event...
for (var i = 0, len = pastEvents.length; i < len; i++) {
    // Find the description and name of the event
    var desc = pastEvents[i].description;
    var name = pastEvents[i].name;
    // Truncate the description to 300 characters
    var tdesc = truncate(desc, 300);

    // And push the data to the description array
    descArray.push({
        title: name,
        description: tdesc
    });
}

// GET past events page and send the username and description array to the page
router.get('/', function (req, res, next) {
    res.render('past-events', {
        title: 'Past Events',
        user: req.user,
        pastEvents: descArray

    });
});

module.exports = router;