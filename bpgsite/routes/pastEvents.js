var express = require('express');
var router = express.Router();
var truncate = require('truncate-html');

var json = require('../public/json/pastEvents.json');
var pastEvents = []
pastEvents = json;
// for print
//node for loop route
var descArray = []; 

for ( var i = 0, len = pastEvents.length; i < len; i++) {
  
  var desc = pastEvents[i].description;
  var name = pastEvents[i].name;
  
  var tdesc = truncate(desc, 300);
 
  descArray.push({
            title: name, 
            description: tdesc
        });


}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('past-events', { 
     title: 'Past Events',
      user: req.user,
      pastEvents: descArray
      
  });
});

module.exports = router;