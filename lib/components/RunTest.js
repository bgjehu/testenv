var KarmaTest = require('./KarmaTest');
var WebdriverTest = require('./WebdriverTest');
var MochaTest = require('./MochaTest');
var TESTRUNNER = require('../constant').TESTRUNNER;

//  this runs only one test task with Karma / WebdriverIO / Mocha config file
module.exports = function(configFile, callback) {

    //  get modules
    var path = require('path');

    //  resolve config file path
    configFile = path.resolve(configFile);

    //  get config object from config file
    var config = require(configFile);

    //  determine what kind of config file it is
    switch(config.testRunner) {
        case TESTRUNNER.KARMA:
            KarmaTest(configFile, callback);
            break;
        case TESTRUNNER.WEBDRIVER:
            WebdriverTest(configFile, callback);
            break;
        case TESTRUNNER.MOCHA:
            MochaTest(configFile, callback);
            break;
        default:
            console.log('ERROR: Invalid Config File!');
            break;
    }
}