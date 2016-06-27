var KarmaTest = require('./KarmaTest');
var WebdriverTest = require('./WebdriverTest');
var MochaTest = require('./MochaTest');

//  TestTask runs task with Karma / WebdriverIO / Mocha config file
var TestTask = function(configFile, callback) {

    //  get modules
    var path = require('path');

    //  resolve config file path
    configFile = path.resolve(configFile);

    //  get config object from config file
    var config = require(configFile);

    //  determine what kind of config file it is
    switch(config.testRunner) {
        case 'karma':
            new KarmaTest(configFile, callback);
            break;
        case 'webdriver':
            new WebdriverTest(configFile, callback);
            break;
        case 'mocha':
            new MochaTest(configFile, callback);
            break;
    }



    // if (typeof(config) === 'function') {

    //     //  it's Karma config
    //     new KarmaTest(configFile, callback);

    // } else {

    //     //  it's WebdriverIO config or Mocha
    //     if(config.config) {

    //         //  it's WebdriverIO config
    //         new WebdriverTest(configFile, callback);

    //     } else {

    //         //  it's Mocha config
    //         new MochaTest(configFile, callback);
    //     }
    // }
}

//  exports Class TestTask
module.exports = TestTask;
