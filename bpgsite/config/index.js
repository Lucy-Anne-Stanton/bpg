/** 
* Find the values in the config file
* Add those values to the url ("mongodb://...") and export it.
* Ensure that the server will reconnect after a timeout (not been in use for an extended period)
**/
var configValues = require('./config');
var mongoose = require('mongoose');

module.exports = {
    getDbConnectionString: function() {
        return 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@' + configValues.uri + ':' + configValues.port + '/' + configValues.dbname;
    }
}

/** 
* How to create a resilient mongoose connection: 
* https://www.ibm.com/blogs/bluemix/2015/10/resilient-connections-between-node-and-mongodb-in-bluemix/ 
**/

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
  //If the database is disconnected, create a new connection
  db.on('disconnected', function() {
    console.log('MongoDB disconnected!');
    mongoose.createConnection(dbURI, {server: {auto_reconnect:true,
      socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }},
      replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }});
  });
  mongoose.createConnection(dbURI, {server:{auto_reconnect:true}});