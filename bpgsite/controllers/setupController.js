'use strict';
var express = require('express');
var router = express.Router();

var request = require('request');
var fs = require('fs-extra');
var http = require('https');

var site = "https://api.meetup.com/Bristol-Photography-Group/events?photo-host=public&sig_id=215630158&sig=23f6b52eb734d90e8bbc032ca7ed2347de943896&callback=?";

request.get({
    url: site,
    json: true,
    headers: {'User-Agent': 'request'}
}, (err, res, data) =>{

    if (err) {
        console.log('Error:', err);
    } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
    } else {
        var file = JSON.stringify(data, null, 2);
        
       fs.writeFile('./public/json/upcomingEvents.json', file, 'utf8', function (err) {
            if (err) return console.log(err);
            
        })

        
    } 
});

var link = "https://api.meetup.com/Bristol-Photography-Group/events?desc=true&photo-host=public&page=15&sig_id=215630158&status=past&sig=99568caedc41881eea5ce290b57edc2bc8d6a4f8";

request.get({
    url: link,
    json: true,
    headers: {'User-Agent': 'request'}
}, (err, res, info) =>{

    if (err) {
        console.log('Error:', err);
    } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
    } else {
        var pastFile = JSON.stringify(info, null, 2);
        
       fs.writeFile('./public/json/pastEvents.json', pastFile, 'utf8', function (err) {
            if (err) return console.log(err);
        })

    } 
});


var Events = require('../models/events');

module.exports = function(app) {
    app.get('/', function(req, res) {
        fs.readFile('./public/json/upcomingEvents.json', 'utf8', function (err, data) {
            if (err) throw err;
            var json = JSON.parse(data);
            
            res.render('index', {
                title: 'Home',
                user: req.user
            });
            
        })
    });

    module.exports = router;
}
