var selenium = require('selenium-standalone');
var selenium_parts = require('selenium-parts');

module.exports = function (done) {
    selenium.start({
        version: '2.53.1',
        basePath: selenium_parts.basePath,
        drivers: {
            chrome: {
                version: '2.22',
                arch: process.arch,
                basePath: selenium_parts.basePath
            },
            firefox: {
                version: '0.9.0',
                arch: process.arch,
                basePath: selenium_parts.basePath
            }
        }
    }, done);
}