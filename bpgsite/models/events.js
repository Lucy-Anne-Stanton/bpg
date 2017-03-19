var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    created : Date,
    id: String,
    name: String,
    status: String,
    time: Date,
    updated: Date,
    utc_offset: Number,
    waitlist_count: Number,
    yes_rsvp_count: Number,
    venue: {
        id: Number,
        name: String,
        lat: Number,
        lon: Number,
        repinned: Boolean,
        address_1: String,
        city: String,
        country: String,
        localized_country_name: String
    },
    group: {
        created: Date,
        name: String,
        id: Number,
        join_mode: String,
        lat: Number,
        lon: Number,
        urlname: String,
        who: String
    },
    link: String,
    description: String,
    how_to_find_us: String,
    visibility: String
});

var Events = mongoose.model('Events', eventSchema);
module.exports = Events;