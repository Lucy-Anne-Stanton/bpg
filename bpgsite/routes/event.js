var express = require('express');
var router = express.Router();
var moment = require('moment-timezone');
var json = require('../public/json/upcomingEvents.json');
var events = [],
events = json;
// for print

/* GET home page. */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    var time = events[id].time;
    var tz0 = moment.tz(time, "Europe/London");
    var dateTime = tz0.format("DD MMMM YYYY hh:mm A");
    console.log("id:", id);
    console.log("events:",  events[id]);
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