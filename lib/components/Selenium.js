var selenium = require('selenium-standalone');

module.exports = function (proxy, done) {
    selenium.install({
        proxy: proxy,
        logger: console.log
    }, function (err) {
        if (err) {
            done(err);
        } else {
            selenium.start({}, done);
        }
    });
}