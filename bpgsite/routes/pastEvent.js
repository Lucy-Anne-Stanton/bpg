/**
 * This route displays information for a selected past event 
**/

var express = require('express');
var router = express.Router();
var moment = require('moment-timezone');

var json = require('../public/json/pastEvents.json');
// The events are added to the pastEvents array
var pastEvents = [],
pastEvents = json;

// GET the id in the uri and set the id a variable
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    // Set the time variable to the time/date of the selected event
    var time = pastEvents[id].time;
    // Format the time/date to GMT and display it in order of day, month year, with a 12 hour clock.
    var tz0 = moment.tz(time, "Europe/London");
    var dateTime = tz0.format("DD MMMM YYYY hh:mm A");
    
    /** Render the page with the required data to display the required information:
    * name of the event, description, latitude, longitude and name of the location,
    * time and date of the event and whether or not it is upcoming.
    **/
  res.render('event', {
      output: req.params.id,
      user: req.user,
      title: pastEvents[id].name,
      desc: pastEvents[id].description,
      lat: pastEvents[id].venue.lat,
      lon: pastEvents[id].venue.lon,
      loc: pastEvents[id].venue.name,
      link: pastEvents[id].link,
      time: dateTime,
      upcoming: "false",
      past: "true"
  });
});


module.exports = router;