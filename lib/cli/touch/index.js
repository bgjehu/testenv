// require different touch modules for different config file
const _ = require('lodash');
const toucher = require('./toucher');
const TESTRUNNER = require('../../constant').TESTRUNNER;
const touch = {
    karma: function (paths) {
        toucher(paths, TESTRUNNER.KARMA);
    },
    webdriver: function (paths) {
        toucher(paths, TESTRUNNER.WEBDRIVER);
    },
    mocha: function (paths) {
        toucher(paths, TESTRUNNER.MOCHA);
    },
}

module.exports = function (args) {
    var opts = args.opts;
    var paths = args.paths;
    
    //  store options that are specified
    var activeOpts = [];
    for(var key in opts){
        var value = opts[key];
        if (value) {
            activeOpts.push(key);
        }
    }

    if (activeOpts.length > 1) {
        
        var count = 0;
        //  specified more than one options
        //  create corresponding config files specified by options
        if (opts.k && opts.k !== true) {
            //  paths are specified under opts.k
            //  create new karma config file under those paths
            touch.karma(opts.k)
            count++;
        }

        if (opts.w && opts.w !== true) {
            //  paths are specified under opts.w
            //  create new webdriver config file under those paths
            touch.webdriver(opts.w)
            count++;
        }

        if (opts.m && opts.m !== true) {
            //  paths are specified under opts.m
            //  create new mocha config file under those paths
            touch.mocha(opts.m)
            count++;
        }

        if(count === 0) {
            console.log('WARN: Please specify the paths after your options.');
        }

    } else if (activeOpts.length === 1) {
        var toucher;
        //  create config files for the only one specified option
        if (opts.k) {
            if (opts.k !== true) {
                //  paths are specified under opts.k as well as args.path
                //  combine
                paths.push(opts.k);
            }
            toucher = touch.karma;
        }
        if (opts.w) {
            if (opts.w !== true) {
                //  paths are specified under opts.w as well as args.path
                //  combine
                paths.push(opts.w);
            }
            toucher = touch.webdriver;
        }
        if (opts.m) {
            if (opts.m !== true) {
                //  paths are specified under opts.m as well as args.path
                //  combine
                paths.push(opts.m);
            }
            toucher = touch.mocha;
        }
        if (paths.length > 0) {
            toucher(paths);
        } else {
            console.log('WARN: Please specify path where you want to create your config file.');
        }
    } else {
        if (paths.length > 0) {
            console.log('WARN: Please specify what kind of config file you want.');
        } else {
            console.log('WARN: Please specify path where you want to create your config file and what kind of config file you want.');
        }
    }
}

