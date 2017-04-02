var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testSchema = new Schema({

    
  currency: {
  id: String,
  value: Number,
  ts: Date
  },
  code: String,
  curr: String,
  loc: String
  
});

var Test = mongoose.model('Test', testSchema);
module.exports = Test;