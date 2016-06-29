var selenium_server = require('selenium-standalone');   //  selenium_server modules
var util = require('../../../util');

//  selenium server driver loading path is __dirname, where this script in
var basePath = __dirname;

//  static options
var selenium_opts = {
    version: '2.53.0',
    basePath: basePath,
    drivers: {
        chrome: {
            version: '2.22',
            arch: 'x64',
            basePath: basePath
        },
        firefox: {
            version: '0.8.0',
            arch: 'x64',
            basePath: basePath
        }
    }
}

//  start the selenium server
var Selenium = function(){
    selenium_server.start(selenium_opts, function (err, cp) {

        if (err) {
            //  log if error
            util.logError(err);
        } else {
            //  store child process for future use
            console.log('Selenium Server is up and running!');
            this.cp = cp;
        }
    });
}

//  close the selenium server
Selenium.prototype.close = function () {
    this.cp.kill();
}

module.exports = Selenium;
