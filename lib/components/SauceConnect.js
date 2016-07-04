const path = require('path');
const binPath = path.resolve(__dirname, '../../bin/sc');  //  sauce connect binPath
const spawn = require('child_process').spawn;
const util = require('../util');

const isSauceUp = function (dataStr) {
    return /.*Sauce Connect is up, you may start your tests.*/.test(dataStr);
}

const isSauceError = function (dataStr) {
    return /.*Error creating pidfile .*/.test(dataStr);
}

module.exports = function(username, key, connected, disconnected, error) {
    //  run sauce connect with username and key
    var cp = spawn(binPath, ['-u', username, '-k', key]);

    //  pipe stderr
    cp.stderr.pipe(process.stderr);

    //  pipe stdin
    process.stdin.pipe(cp.stdin);

    //  pipe and check stdout
    cp.stdout.on('data', (data) => {

        //  sauce text log come in, log
        console.log(util.normalizePipedText(data, 'Sauce'));

        //  check if sauce connect is up
        if (isSauceUp(data)) {
            
            //  invoke connectedHandler
            if (connected) connected();
        }

        //  check if sauce connect encounter error
        if (isSauceError(data)) {
            if (error) error(new Error('Sauce Connect Tunnel exists already.'));
            cp.kill();
        }
    });

    cp.on('exit', function() {
        if (disconnected) disconnected();
    });
    
    //  on error
    cp.on('error', function(err) {
        if (error) error(err);
        cp.kill();
    });

    return cp;
}