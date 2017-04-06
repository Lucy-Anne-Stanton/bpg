/**
 * This route enables the events to be displayed
**/

var express = require('express');
var router = express.Router();
var truncate = require('truncate-html');
var json = require('../public/json/upcomingEvents.json');

// The events are added to an events array
var events = []
events = json;
// Worked out how to use for loop from this: http://stackoverflow.com/questions/33986989/can-routes-in-express-be-declared-with-a-loop
// Create an array to store the required data into
var descArray = [];
// For each event...
for (var i = 0, len = events.length; i < len; i++) {
    // Find the description, name and id of the event
    var desc = events[i].description;
    var name = events[i].name;
    var id = i;
    // Truncate the description to 300 characters
    var tdesc = truncate(desc, 300);

    // And push the data to the description array
    descArray.push({
        title: name,
        description: tdesc,
        id: id
    });
}

// GET events page and send the username and description array to the page
router.get('/', function (req, res, next) {
    res.render('events', {
        title: 'Events',
        user: req.user,
        events: descArray
    });
});

module.exports = router;