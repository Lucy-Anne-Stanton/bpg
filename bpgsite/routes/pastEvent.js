var express = require('express');
var router = express.Router();
var moment = require('moment-timezone');

var json = require('../public/json/pastEvents.json');
var pastEvents = [],
pastEvents = json;
// for print

/* GET home page. */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    var time = pastEvents[id].time;
    var tz0 = moment.tz(time, "Europe/London");
    var dateTime = tz0.format("DD MMMM YYYY hh:mm A");
    console.log("id:", id);
    console.log("id:",  pastEvents[id]);
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