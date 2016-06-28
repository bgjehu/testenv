var path = require('path');
module.exports = {
    chrome_launcher: require('karma-chrome-launcher') || require(path.resolve(__dirname, './node_modules/karma-chrome-launcher/index')),
    firefox_laucher: require('karma-firefox-launcher') || require(path.resolve(__dirname, './node_modules/karma-firefox-launcher')),
    phantomjs_launcher: require('karma-phantomjs-launcher') || require(path.resolve(__dirname, './node_modules/karma-phantomjs-launcher'))
}