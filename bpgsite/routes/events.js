var express = require('express');
var router = express.Router();
var truncate = require('truncate-html');

var json = require('../public/json/upcomingEvents.json');
var events = []
events = json;
// for print

//node for loop route
var descArray = []; 

for ( var i = 0, len = events.length; i < len; i++) {
  
  var desc = events[i].description;
  var name = events[i].name;
  var id = i;
  
  var tdesc = truncate(desc, 300);
 
  descArray.push({
            title: name, 
            description: tdesc,
            id: id
        });


}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('events', { 
     title: 'Events',
      user: req.user,
      events: descArray
  });
});

module.exports = router;