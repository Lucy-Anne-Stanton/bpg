var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    res.redirect('/');
  }
  res.render('signin', { 
     title: 'Sign In',
     user: req.user
     
      
  });
});

module.exports = router;

