/**
 * This route displays information for a selected event 
**/

var express = require('express');
var router = express.Router();
var moment = require('moment-timezone');
var json = require('../public/json/upcomingEvents.json');
// The events are added to an events array
var events = [],
    events = json;

// GET the id in the uri and set the id a variable
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    // Set the time variable to the time/date of the selected event
    var time = events[id].time;
    // Format the time/date to GMT and display it in order of day, month year, with a 12 hour clock.
    var tz0 = moment.tz(time, "Europe/London");
    var dateTime = tz0.format("DD MMMM YYYY hh:mm A");
    
    /** Render the page with the required data to display the required information:
    * name of the event, description, latitude, longitude, name of the location, link to the event on Meetup (for RSVPs),
    * time and date of the event and whether or not it is upcoming.
    **/
    res.render('event', {
        output: req.params.id,
        user: req.user,
        title: events[id].name,
        desc: events[id].description,
        lat: events[id].venue.lat,
        lon: events[id].venue.lon,
        loc: events[id].venue.name,
        link: events[id].link,
        time: dateTime,
        upcoming: "true",
        past: "false"
    });
});


module.exports = router;