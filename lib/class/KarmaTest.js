var util = require('./util');

module.exports = function(configFile, callback) {

    //  log
    util.log('Karma', configFile);

    //  get modules
    var karma = require('karma');
    var Server = karma.Server;

    //  fire up Karma Testing Server and run the test in it
    new Server({configFile:configFile}, callback).start();
}