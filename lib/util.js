var readline = require('readline');
var argv = require('yargs').argv;

exports.cliYesNoPrompt = function(question, yesCallback, noCallback, endCallback) {
    var rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
    var prompt = function(rl) {
        rl.question(question + ' (Y/N)\n', function(ans) {
            switch (ans) {
                case 'Y':
                case 'y':
                    rl.close();
                    if (yesCallback) yesCallback();
                    if (endCallback) endCallback();
                    break;
                case 'N':
                case 'n':
                    rl.close();
                    if (noCallback) noCallback();
                    if (endCallback) endCallback();
                    break;
                default:
                    console.log('ERROR: Invalid Input')
                    prompt(rl);
                    break;
            }
        });
    }
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
    //  check for options
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