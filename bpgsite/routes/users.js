var express = require('express');
var router = express.Router();
var passport = require('passport');
var userService = require('../services/user-services');
var config = require('../config');

/* GET users listing. */
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
    passport.authenticate('local', {
        failureRedirect: '/signin',
        successRedirect: '/',
        failureFlash: 'Invalid username or password'
    }), function (req, res, next) {
        res.redirect('/');
    });

router.get('/logout', function (req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;


