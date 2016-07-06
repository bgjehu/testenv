//  get command modules
var init = require('./init');           //  testenv init to create default testenv.json for testenv configuration
var touch = require('./touch');         //  testenv touch to create default karma/webdriver/mocha config file
var help = require('./help');           //  testenv help to show help info
var run = require('./run');             //  testenv run to execute test with test config file
var util = require('../util');           //  util module with util functions


module.exports = function() {

    //  get organized arguments         argument includes command, paths, and options, they are passed through CLI
    var args = util.getArgs();
    
    //  process command
    if (!args.cmd || args.cmd === 'help' || args.opts.h) {

        //  if command is help
        //  show help info
        help();
    }
    switch(args.cmd){

        //  For other commands, run corresponding modules
        case 'touch':
            touch(args);
            break;

        case 'run':
            run(args);
            break;

        case 'init':
            init();
            break;
            
        default:
            //  for unknown command, show help info
            console.log('ERROR: Unknown command!');
            help();
            break;
    }
}

