var configValues = require('./info/config');
var mongoose = require('mongoose');

var config =  {};
config.mongoUri = 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@' + configValues.uri + ':' + configValues.port + '/' + configValues.dbname; //'mongodb://localhost:27017/bpgdb'; //referring to bpg db
config.cookieAge=30*24*3600*1000;
module.exports = config;


dbURI = 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@' + configValues.uri + ':' + configValues.port + '/' + configValues.dbname;
var db = mongoose.connection;

  db.on('connecting', function() {
    console.log('connecting to MongoDB...');
  });

  db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
  });
  db.on('connected', function() {
    console.log('MongoDB connected!');
  });
  db.once('open', function() {
    console.log('MongoDB connection opened!');
  });
  db.on('reconnected', function () {
    console.log('MongoDB reconnected!');
  });
  db.on('disconnected', function() {
    console.log('MongoDB disconnected!');
    mongoose.createConnection(dbURI, {server: {auto_reconnect:true,
      socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }},
      replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }});
  });
  mongoose.createConnection(dbURI, {server:{auto_reconnect:true}});