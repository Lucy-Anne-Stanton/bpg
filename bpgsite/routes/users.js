/**
 * This page was created when developing the secure sign in/registration
 * This route enables the users to sign in and out to be displayed
**/

var express = require('express');
var router = express.Router();
var passport = require('passport');
var userService = require('../services/user-services');
var config = require('../config');

// GET users request.
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/login',
    /* function (req, res, next) {
         req.session.visitorNumber = 20000;
         if (req.body.rememberMe) {
             req.session.cookie.maxAge = config.cookieAge;
         }
         next();
     },*/
            
    // If the user types in an invalid username or password, send a notification
    passport.authenticate('local', {
        failureRedirect: '/signin',
        successRedirect: '/',
        failureFlash: 'Invalid username or password'
    }),
    // If the user successfully signs in, redirect to the homepage
    function (req, res, next) {
        res.redirect('/');
    });
// If the user presses the logout button, destroy the session and redirect to the home page.
router.get('/logout', function (req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;