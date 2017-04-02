/**
 *  This was created to enable users to create accounts and sign in securely, which was replaced with passport-meetup signin 
**/

module.exports = function () {
    var passport = require('passport');
    var bcrypt = require('bcrypt-nodejs');
    var passportLocal = require('passport-local');
    var userService = require('../services/user-services');

    //pass new instance of the passport local strategy which takes a function to verify the password
/*
    passport.use(new passportLocal.Strategy({usernameField: 'email'},function (email, password, next) {
        userService.findUser(email, function (err, user) {
            if (err) {
                return next(err);
            }
            //user doesn't exist in the database
            if (!user) {
                return next(null, null);
            }
            //either email or password is incorrect
            bcrypt.compare(password, user.password, function(err, same) {
                if (err) {
                    return next(err);
                }
                if(!same){
                    return next(null, null);
                }
                next(null, user); //no error and valid user
            });
        });
    }));

    passport.serializeUser(function (user, next) {
        next(null, user.email); //serialized version of the user - here its just email
    });
    passport.deserializeUser(function (email, next) {
        userService.findUser(email, function (err, user) {
            next(err, user);
        });
    });
    */
};