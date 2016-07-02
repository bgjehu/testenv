const path = require('path');
const spawn = require('child_process').spawn;
const util = require('../util');
var binPath;    //  wdio binPath
try {
    //  webdriverio module is in testenv
    binPath = path.resolve(__dirname, '../../node_modules/webdriverio/bin/wdio');
} catch (err) {
    //  webdriverio module is in parent module of testenv
    binPath = path.resolve(process.cwd, './node_modules/webdriverio/bin/wdio');
}

module.exports = function(configFile, done, error) {
    var cp = spawn(binPath, [configFile, '--color']);

    //  pipe stderr
    cp.stderr.pipe(process.stderr);

    //  pipe stdin
    process.stdin.pipe(cp.stdin);

    //  pipe stdout
    cp.stdout.pipe(process.stdout);

    cp.on('exit', function() {
        if (done) done();
    });
    
    //  on error
    cp.on('error', function(err) {
        if (error) error(err);
        cp.kill();
    });

    return cp;
}
