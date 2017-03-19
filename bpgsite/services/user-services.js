var User = require('../models/user').User;
var bcrypt = require('bcrypt-nodejs');

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

exports.findUser = function (email, next) {
    User.findOne({ email: email }, function (err, user) {
        next(err, user);
    });
};

/* http://www.ibm.com/developerworks/library/wa-mean5/index.html

    displayName: profile.displayName,
    email: '',
    username: profile.id,
    provider: profile.provider,
    providerIdentifierField: 'id',
    providerData: providerData 
    
    
    
    
    
    firstName : user.firstname,
    lastName : user.lastname,
    email : user.email.toLowerCase(),
    password : hash*/