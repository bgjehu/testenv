var init = require('./init');
var touch = require('../touch/index');
var help = require('./help');
var util = require('./util');
var run = require('./run');

module.exports = function() {
    var args = util.getArgs();
    if (!args.cmd || args.cmd === 'help' || args.opts.h) {
        help();
    }
    switch(args.cmd){
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
            console.log('Error: Unknown command!');
            help();
            break;
    }
}

