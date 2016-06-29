var util = require('../../util');
var Selenium = require('./selenium/index');


module.exports = function(configFile, callback) {

    //  log
    util.logTestRun('Webdriver', configFile);

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
            
            //  server listen to port
            server.app.listen(server.port, function () {
                console.log('Server listening on port: ' + server.port + ' for Webdriver Test');
            });
        }   
    }
    
    //  done callback
    function done() {
        //  close everything
        if(selenium) selenium.close();
        if(app) app.close();

        //  invoke callback
        callback();
    }

    //  pipe configFile to WebdriverIO
    gulp.src(configFile)
        .pipe(wdio())
        .once('error', (err) => {
            //  log error if any
            util.logError(err);
            done();
        })
        .once('end', () => {
            done();
        });
}