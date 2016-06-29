var readline = require('readline');
var argv = require('yargs').argv;

//  log test run
exports.logTestRun = function (testRunner, configFile) {
    //  karma: aaaa.js
    console.log(testRunner + ": " + configFile);
}

//  CLI Yes and No Prompt
exports.cliYesNoPrompt = function(question, yesCallback, noCallback, endCallback) {
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

exports.getArgs = function() {
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

exports.logError = function(err) {
    throw err;
    //  need implement
}