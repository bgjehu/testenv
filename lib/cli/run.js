var _ = require('lodash');
var path = require('path');
var Runner = require('../runner/index');        //  the 'class' that actually run the test with config file

module.exports = function (args) {
    if (args.paths.length > 0) {
        //  there is path, run custom test
        runCustomTest(args);
    } else {
        //  there is not path, run preset
        runPresetTest(args);
    }
}

var runCustomTest = function(args) {
    var msg = 'Run custom test with config file';
    if (args.paths.length > 1) {
        msg += 's:\n';
        _.map(args.paths, function (path) {
            msg += '\t' + path + '\n';
        });
    } else {
        //  must be only one path for only call this runCustomTest() args.paths.length > 0
        msg += ': ' + args.paths[0];
    }
    console.log(msg);
    new Runner(args.paths, function done() {
        console.log('End custom test.');
    });
}

var runPresetTest = function(args) {
    try {
        var testenvJSON = path.resolve(process.cwd(), 'testenv.json');
        var presets = require(testenvJSON);
        //  turn to absolute path
        presets = _.mapValues(presets, function (str_array) {
            return _.map(str_array, function (str) {
                return path.resolve(process.cwd(), str);
            })
        })
        var opts = _.pickBy(args.opts, function (optValue) {
            return optValue;
        })
        var testConfigFiles, testName;
        if (_.isEqual(opts, {c: true, u: true})) {
            testName = 'client side unit test';
            testConfigFiles = presets.client_uni;
        } else if (_.isEqual(opts, {c: true, i: true})) {
            testName = 'client side integration test';
            testConfigFiles = presets.client_int;
        } else if (_.isEqual(opts, {c: true, e: true})) {
            testName = 'client side end-to-end test';
            testConfigFiles = presets.client_e2e;
        } else if (_.isEqual(opts, {s: true, u: true})) {
            testName = 'server side unit test';
            testConfigFiles = presets.server_uni;
        } else if (_.isEqual(opts, {s: true, i: true})) {
            testName = 'server side integration test';
            testConfigFiles = presets.server_int;
        } else if (_.isEqual(opts, {s: true, e: true})) {
            testName = 'server side end-to-end test';
            testConfigFiles = presets.server_e2e;
        } else if (_.isEqual(opts, {c: true})) {
            testName = 'client side test';
            testConfigFiles = presets.client;
        } else if (_.isEqual(opts, {s: true})) {
            testName = 'server side test';
            testConfigFiles = presets.server;
        } else if (_.isEqual(opts, {a: true})) {
            testName = 'all test';
            testConfigFiles = presets.all;
        } else {
            //  do nothing
        }

        if(testConfigFiles) {
            new Runner(testConfigFiles, function done() {
                console.log('End ' + testName);
            });
        }
    }
    catch (ex) {
        if (/(Cannot find module \')(.*)(testenv\.json\')/.test(ex.message)) {
            console.log('\nMissing testenv.json file. Use \'testenv init\' to create.\n');
        } else {
            
        }
        throw ex;
    }
}