var express = require('express');
var router = express.Router();
var restrict = require('../auth/restrict');
/* GET home page. */
router.get('/', restrict, function(req, res, next) {
  res.render('events', { 
     title: 'Events',
      firstName : req.user ? req.user.firstName : null,
      visitorNumber : req.session.visitorNumber
     
      
  });
});

module.exports = router;