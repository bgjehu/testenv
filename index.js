/*
    Note:	there are two kinds config file. First one is the test config file, created by user manually or thru CLI to specify how they want their tests to be run.
            usually with name '***.config.js'. The second one is the testevn config file. It is named testenv.json in the root, work like a package.json. It used to
            specify the setting of testenv.
*/

var path = require('path');
module.exports = {
    chrome_launcher: require('karma-chrome-launcher') || require(path.resolve(__dirname, './node_modules/karma-chrome-launcher')),
    firefox_laucher: require('karma-firefox-launcher') || require(path.resolve(__dirname, './node_modules/karma-firefox-launcher')),
    phantomjs_launcher: require('karma-phantomjs-launcher') || require(path.resolve(__dirname, './node_modules/karma-phantomjs-launcher')),
    browserify_istanbul: require('browserify-istanbul') || require(path.resolve(__dirname, './node_modules/browserify-istanbul'))
}