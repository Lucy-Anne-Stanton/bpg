'use strict';
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var request = require('request');
var fs = require('fs-extra');
var http = require('https');
var db = mongojs('mongodb://localhost:27017/bpgdb', ["upcomingEvents"]);

var ts = 21600000;
var test = 1800000;

var site = "https://api.meetup.com/Bristol-Photography-Group/events?photo-host=public&sig_id=215630158&sig=23f6b52eb734d90e8bbc032ca7ed2347de943896&callback=?";
/*
function getData(cb) {
    http.get(site, function(res) {
        res.setEncoding('utf8');

        var body = '';
        res.on('data', function(d) {
            body += d;
        });

        res.on('end', function() {
            try {
                var parsed = JSON.parse(body);
            } catch (err) {
                console.error('Unable to parse response as JSON', err);
                return cb(err);
            }
            cb(
                parsed.objects
            );
        });
    }).on('error', function(err){
        console.error('Error with the request:', err.message);
        cb(err);
    });
}

function writeData (data, allGood) {
    console.log('writing');
    console.log(typeof data);
    console.log(data);

    mongoose.collection('upcomingEvents').insert(data, function(error, record){
        if (error) throw error;
        console.log("data saved");
    });
}

function allGood(){console.log('all done');}

getData(writeData);

module.exports = router;

*/
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
        
        fs.writeFile('./bpgsite/public/json/test.json', file, 'utf8', function (err) {
            if (err) return console.log(err);
            console.log('j > test.json')
        })
        fs.readFile('./bpgsite/public/json/test.json', 'utf8', function (err, data) {
            var endTime;
            var now;
            if (err) return console.error(err);
            
            now = new Date().getTime();
            endTime = new Date(data.ctime).getTime() + test;
            if (now > endTime) {
                console.log(data);
                var json = JSON.parse(data);
                
                db.upcomingEvents.update(json, function (err, doc) {
                    if(err) return console.error(err);
                    
                    console.log(data);
                });
            }
        });
    } 
});

//rsp - stackoverflow.com/questions/11826384/calling-a-json-api-with-node-js
// stackoverflow.com/questions/34156282/how-do-i-save-json-to-local-text-file