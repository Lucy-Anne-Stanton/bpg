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


//rsp - stackoverflow.com/questions/11826384/calling-a-json-api-with-node-js
// stackoverflow.com/questions/34156282/how-do-i-save-json-to-local-text-file