//  deprecated

var path = require('path');
var spawn = require('child_process').spawn;
var phantomjs_prebuilt = require('phantomjs-prebuilt');
var binPath = phantomjs_prebuilt.path;

var PhantomJS = function(port){
    var args = ['--webdriver=' + port];
    var cp = spawn(binPath, args)
    cp.stdout.pipe(process.stdout);
    cp.stderr.pipe(process.stderr);
    process.stdin.pipe(cp.stdin);

    cp.on('error', function (err) {
        console.error('Error executing phantom at', binPath);
        console.error(err.stack);
        cp.kill('SIGTERM');
        process.exit(1);
    });

    cp.on('exit', function(code){
    // Wait few ms for error to be printed.
        setTimeout(function(){
            process.exit(code)
        }, 20);
    });

    process.on('SIGTERM', function() {
        cp.kill('SIGTERM');
        process.exit(1);
    });

    this.cp = cp;
}

PhantomJS.prototype.close = function () {
    this.cp.kill('SIGTERM');
}

module.exports = PhantomJS;