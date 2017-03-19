var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userService = require('../services/user-services');

var userSchema = new Schema({
firstName : {type: String, required : 'First Name is required'},
displayName: {type: String},
userInfo: {type: String},
userPhoto: {type: String},
username: {type: Number},
provider: {type: String},
providerIdentifierField: {type: String},
organiser: {type: Boolean}
//,
//car : {type: boolean, default : false }
});
/*
userSchema.path('email').validate(function(value,next){
    userService.findUser(value,function(err,user){
        if(err){
            console.log(err);
            return next(false);
        }
        next(!user);
    });
}, 'That email is already in use'); */

var User = mongoose.model('User',userSchema);
module.exports = {
        User : User
};