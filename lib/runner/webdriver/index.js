var util = require('../util');
var Selenium = require('./selenium/index');


module.exports = function(configFile, callback) {

    //  log
    util.log('Webdriver', configFile);

    //  get modules
    var gulp = require('gulp');
    var wdio = require('gulp-webdriver');
    
    //  setup browsers
    var selenium = new Selenium();
    
    //  host server
    var config = require(configFile);
    

    //  open up server if that is defined
    if (config.server) {
        var server = config.server;
        if (server.app && server.port) {  //  port where the app listen on
            server.app.listen(server.port, function () {
                console.log('Server listening on port: ' + server.port + ' for Webdriver Test');
            });
        }   
    }
    
    function done() {
        if(selenium) selenium.close();
        if(app) app.close();
        callback();
    }

    //  pipe configFile to WebdriverIO
    gulp.src(configFile)
        .pipe(wdio())
        .once('error', () => {
            done();
        })
        .once('end', () => {
            done();
        });
}