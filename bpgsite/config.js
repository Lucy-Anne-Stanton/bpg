var config =  {};
config.mongoUri ='mongodb://localhost:27017/bpgdb'; //referring to bpg db
config.cookieAge=30*24*3600*1000;
module.exports = config;