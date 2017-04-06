/** 
 * retreives and saves events into JSON files
*/

/** This was consulted when attempting to display events with JSON:
* http://stackoverflow.com/questions/10011011/using-node-js-how-do-i-read-a-json-object-into-server-memory
* http://stackoverflow.com/questions/10232574/handlebars-js-parse-object-instead-of-object-object
* http://stackoverflow.com/questions/14875112/how-can-i-pass-json-to-client-using-node-js-hbs-express
* http://stackoverflow.com/questions/34156282/how-do-i-save-json-to-local-text-file
**/
'use strict';
var express = require('express');
var router = express.Router();

var request = require('request');
var fs = require('fs-extra');
var http = require('https');
module.exports = function(app) {
// request to Meetup url to receive upcoming event data
var site = "https://api.meetup.com/Bristol-Photography-Group/events?photo-host=public&sig_id=215630158&sig=23f6b52eb734d90e8bbc032ca7ed2347de943896&callback=?";

request.get({
    url: site,
    json: true,
    headers: {'User-Agent': 'request'}
}, (err, res, data) =>{
    // if there is an error getting the data, display the error
    if (err) {
        console.log('Error:', err);
        // if the status is not 200 (okay), display the status
    } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
        // else, put the data into json format as file variable
    } else {
        var file = JSON.stringify(data, null, 2);
        // write the formatted data to upcomingEvents.json 
       fs.writeFile('./public/json/upcomingEvents.json', file, 'utf8', function (err) {
            if (err) return console.log(err);
        })

        
    } 
});

// request to Meetup url to receive upcoming event data
var link = "https://api.meetup.com/Bristol-Photography-Group/events?desc=true&photo-host=public&page=15&sig_id=215630158&status=past&sig=99568caedc41881eea5ce290b57edc2bc8d6a4f8";

request.get({
    url: link,
    json: true,
    headers: {'User-Agent': 'request'}
}, (err, res, info) =>{
    // if there is an error getting the data, display the error
    if (err) {
        console.log('Error:', err);
        // if the status is not 200 (okay), display the status
    } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
        // else, put the data into json format as pastFile variable
    } else {
        var pastFile = JSON.stringify(info, null, 2);
        // write the formatted data to pastEvents.json 
       fs.writeFile('./public/json/pastEvents.json', pastFile, 'utf8', function (err) {
            if (err) return console.log(err);
            //console.log('j > test.json')
        })

    } 
});

/**
* var Events was created when the data was being added to databases
var Events = require('../models/events');
**/

//If the index is loaded, read the upcoming events file
/*
    app.get('/', function(req, res) {
        fs.readFile('./public/json/upcomingEvents.json', 'utf8', function (err, data) {
        
            if (err) throw err;
            var json = JSON.parse(data),
                
                options = { upsert: true, new: true, multi: true };
            //render the index page
            res.render('index', {
                title: 'Home',
                user: req.user
            });
            
        })
    });
*/
    module.exports = router;
}
