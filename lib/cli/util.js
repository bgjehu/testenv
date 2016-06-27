var argv = require('yargs').argv;

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