var express = require('express');
var router = express.Router();
var databaseUrl = 'mongodb://BPG_admin:Uwe31608Password@ds031608.mlab.com:31608/bpg';
var db = require("mongojs")(databaseUrl);
var userDb = db.collection('users');
/* GET home page. */

router.get('/', function(req, res, next) {

  userDb.find({ "organiser": { $eq: "true" } }, function (err, result) {
        if (err) {
          console.log(err);
        }
        else if (result) {
          var organisers = result;
          //organisers.push(result);
          console.log(organisers);
          
          console.log("User is already in database!");
        

      
  res.render('meet', { 
     title: 'Meet the Organisers',
      user: req.user,
     organisers: organisers
      });
        }
  });
});

module.exports = router;