var express = require('express');
var router = express.Router();
var passport = require('passport');
var userService = require('../services/user-services');
var config = require('../config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//render a view with title property

router.get('/create', function(req, res, next) {
    var vm={
        title : 'Sign up'
    }
    res.render('users/create', vm);
    
});


router.post('/create', function(req,res,next) {
    userService.addUser(req.body,function(err){
    if(err){
        console.log(err);
        var vm={
            title: 'Sign up',
            input:req.body,
            error: err
        }
        delete vm.input.password;
        return res.render('users/create',vm);
    }
        req.login(req.body,function(err){
            res.redirect('/');
        });
    });
    
});

router.post('/login',
            function(req,res,next){
    req.session.visitorNumber = 20000;
    if(req.body.rememberMe) {
        req.session.cookie.maxAge=config.cookieAge;
    }
    next();
},
            passport.authenticate('local', {
    failureRedirect : '/signin',
    successRedirect : '/',
    failureFlash : 'Invalid username or password'
}), function(req, res, next) {
   res.redirect('/'); 
});

router.get('/logout', function(req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
