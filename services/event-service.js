/**
* This service was created to save event information by using a Mongoose model (events)
* This is not required anymore, as JSON files are used instead
**/

'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Events = require('../models/events').Event;

exports.addEvents=function(events,next) {
    var newEvents = new Events({
        data : event.data
    });

    newEvents.save(function(err){
        if(err){
            return next(err);
        }
        else{
            next(null);
        }
    });
}