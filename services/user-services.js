/**
 * This page was created when developing the secure sign in/registration
 * This service determines whether or not the user exists and allows them to sign in
**/

var User = require('../models/user').User;
var bcrypt = require('bcrypt-nodejs');

// creates a new user via Mongoose model user
exports.addUser = function (user, next) {
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) {
            return next(err);
        }
        //user.password is now replaced with hash
        var newUser = new User({
            displayName: profile.displayName,
            email: '',
            username: profile.id,
            provider: profile.provider,
            providerIdentifierField: 'id',
            providerData: providerData
        });
        
        //saves the new user
        newUser.save(function (err) {
            if (err) {
                return next(err);
            }
            else {
                next(null);
            }
        });

    });

}
// Finds a user with a matching email address
exports.findUser = function (email, next) {
    User.findOne({ email: email }, function (err, user) {
        next(err, user);
    });
};
