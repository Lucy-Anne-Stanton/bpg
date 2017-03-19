var express = require('express');
var router = express.Router();
var truncate = require('truncate-html');

var json = require('../public/json/upcomingEvents.json');
var events = []
events = json;
// for print

/* GET home page. */
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
//  http://stackoverflow.com/questions/33986989/can-routes-in-express-be-declared-with-a-loop
  
 // useful? http://stackoverflow.com/questions/20434188/node-js-express-for-loop-and-app-get-to-serve-articles

router.get('/', function(req, res, next) {
  

  res.render('index', { 
     title: 'Home',
      user: req.user,
      events: descArray
  });
  
});

module.exports = router;