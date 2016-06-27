var touch = {
    karma: require('./karma'),
    webdriver: require('./webdriver'),
    mocha: require('./mocha'),
}

module.exports = function (args) {
    var opts = args.opts;
    if (opts.k && opts.k !== true) {
        touch.karma(opts.k)
    }
    if (opts.w && opts.w !== true) {
        touch.webdriver(opts.w)
    }
    if (opts.m && opts.m !== true) {
        touch.mocha(opts.m)
    }
}

