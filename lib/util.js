const readline = require('readline');
const argv = require('yargs').argv;
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const colors = require('colors');
const TESTRUNNER = require('./constant').TESTRUNNER;

//  log test run
var logTestRun = exports.logTestRun = function (testRunner, configFile) {
    //  use different color for diff test runner
    switch(testRunner) {
        case TESTRUNNER.KARMA:
            testRunner = testRunner.green;
            break;
        case TESTRUNNER.WEBDRIVER:
            testRunner = testRunner.red;
            break;
        case TESTRUNNER.MOCHA:
            testRunner = testRunner.yellow;
            break;
    }
    //  log
    console.log(`Execute ${testRunner} with config file: ${configFile.blue}`);
}

//  CLI Yes and No Prompt
var cliYesNoPrompt = exports.cliYesNoPrompt = function(question, yesCallback, noCallback, endCallback) {
    //  create readline interface
    var rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

    //  use the interface to create the prompt to show question and take inputs
    var prompt = function(rl) {
        rl.question(question + ' (Y/N)\n', function(ans) {
            switch (ans) {
                case 'Y':
                case 'y':
                    //  if yes, close the interface, need it no more
                    rl.close();

                    //  invoke callback if available
                    if (yesCallback) yesCallback();
                    if (endCallback) endCallback();
                    break;
                case 'N':
                case 'n':
                    //  if yes, close the interface, need it no more
                    rl.close();

                    //  invoke callback if available
                    if (noCallback) noCallback();
                    if (endCallback) endCallback();
                    break;
                default:
                    //  show error
                    console.log('ERROR: Invalid Input');

                    //  prompt again
                    prompt(rl);
                    break;
            }
        });
    }
    //  prompt the question
    prompt(rl);
}

var getArgs = exports.getArgs = function() {
    //  init args
    var args = {
        cmd: null,
        paths: [],
        opts: {}
    };
    
    //  get args
    for(var i = 0; i < argv._.length; i++) {
        //  the first as cmd
        //  the rest as paths
        if (i === 0)
            args.cmd = argv._[i];
        else
            args.paths.push(argv._[i]); 
    }
    //  check for every options
    args.opts.a = argv.a;
    args.opts.c = argv.c;
    args.opts.e = argv.e;
    args.opts.h = argv.h;
    args.opts.i = argv.i;
    args.opts.k = argv.k;
    args.opts.m = argv.m;
    args.opts.s = argv.s;
    args.opts.u = argv.u;
    args.opts.w = argv.w;
    return args;
}

var logError = exports.logError = function(err) {
    var time = new Date();
    var filePath = path.join(__dirname, '../.testenvlog');
    var msg = '******************************************************************************************\n'
                + `${time}: ${err.message}\n${err.stack}\n`
                + '******************************************************************************************\n';
    fs.appendFile(filePath, msg, function (err) {
        if(err) throw err;
    });
}

var stringIsEmptyOrSpaces = exports.stringIsEmptyOrSpaces = function(str) {
    return str === null || str.match(/^ *$/) !== null;
}

var normalizePipedText = exports.normalizePipedText = function(data, pipeName) {

    
    var lines = `${data}`.split('\n');
    var normL = [];
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (!isEmptyOrSpaces(line)) {
            if (pipeName) {
                normL.push(`${pipeName}: ${line}`);
            } else {
                normL.push(`${line}`);
            }
        }
    }
    return normL.join('\n');
}