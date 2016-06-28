var selenium_server = require('selenium-standalone');
var basePath = __dirname;
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

var Selenium = function(){
    selenium_server.start(selenium_opts, function (err, cp) {
        if (err) {
            throw err;
        } else {
            console.log('Selenium Server is up and running!');
            this.cp = cp;
        }
    });
}

Selenium.prototype.close = function () {
    this.cp.kill();
}

module.exports = Selenium;
