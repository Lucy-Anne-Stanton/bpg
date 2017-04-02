var Events = require('../models/events');
var bodyParser = require('body-parser');

module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended:true
    }));
/*
    app.get('api/event/:ename', function(req, res) {
        Events.find({name: req.params.ename},
        function(err, events){
            if (err) throw err;

            res.send(events);
        });
    });

    app.get('api/event/:id', function(req, res) {
        Events.findById({ id: req.params.id}, function(err, evnt) {
            if (err) throw err;

            res.send(evnt);
        });
    });
    */
}