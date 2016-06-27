var util = require('./util');
var PhantomJS = require('./PhantomJS');

module.exports = function(configFile, callback) {

    //  log
    util.log('Webdriver', configFile);

    //  get modules
    var gulp = require('gulp');
    var wdio = require('gulp-webdriver');
    var port_phantomjs = require(configFile).config.port;     //  port for phantomjs/webdriver to use
    var config = require(configFile);
    var app;
    var port_app;

    //  open phantomjs
    var phantomjs = new PhantomJS(port_phantomjs);

    //  open up server if that is defined
    if (config.server) {
        app = server.app;
        port_app = server.port;
        if (app && port_app) {  //  port where the app listen on
            app.listen(port_app, function () {
                console.log('Server listening on port: ' + port_app + ' for Webdriver Test');
            });
        }   
    }
    
    function done() {
        phantomjs.close();
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