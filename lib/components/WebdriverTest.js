const SauceConnect = require('./SauceConnect');
const WebdriverIO = require('./WebdriverIO');
const util = require('../util');
const WEBDRIVER = require('../constant').TESTRUNNER.WEBDRIVER;
const colors = require('colors');

var server, serverReady, sauceReady, sc, wdio, config, configFile, done, error, sauceDisconnected, wdioDone;

const init = function () {
    server = null;
    serverReady = false;
    sauceReady = false;
    sc = null;
    wdio = null;
    config = null;
    configFile = null;
    done = null;
    error = null;
    sauceDisconnected = false;
    wdioDone = false;
}

const cleanUp = function () {
    if (server) server.close();
    if (sc) {
        if (!sc.exitCode) {
            sc.kill()
        }
    }
    if (wdio) {
        if (!wdio.exitCode) {
            wdio.kill()
        }
    }
}

const isServerDefined = function () {
    try {
        return config.server.app && config.server.port;
    } catch (err) {
        return false;
    }
}

const isSauceRequired = function () {
    try {
        return config.config.services.indexOf('sauce') > -1 && config.config.user && config.config.key;
    } catch (err) {
        return false;
    }
}

const SauceUnrequiredHandler = function () {
    sauceReady = true;
    sauceDisconnected = true;
    log('Sauce is not required'.yellow);
    SIGNEXT();
}

const log = function (str) {
    console.log(`WebdriverTest: ${str}`);
}

const ServerUndefinedHandler = function () {
    serverReady = true;
    log('Server is undefined.'.yellow);
    SIGNEXT();
}

const ServerUpHandler = function () {
    serverReady = true;
    log(`Server is listening to port ${config.server.port}.`.green);
    SIGNEXT();
}

const SauceConnectedHandler = function () {
    sauceReady = true;
    log('Sauce connected.'.green);
    SIGNEXT();
}

const SauceDisconnectedHandler = function () {
    sauceDisconnected = true;
    SIGDONE();
}

const SauceErrorHandler = function (err) {
    error = error || err;
    if (server) server.close();
    if (wdio) wdio.kill();
}

const WebdriverDoneHandler = function () {
    wdioDone = true;
    if (sc) sc.kill();
    SIGDONE();
}

const WebdriverErrorHandler = function (err) {
    error = error || err;
    if (server) server.close();
    if (sc) sc.kill();
}

const SIGNEXT = function () {
    if (serverReady && sauceReady) {
        wdio = WebdriverIO(configFile, WebdriverDoneHandler, WebdriverErrorHandler);
    }
}

const SIGDONE = function () {
    if (wdio) {
        //  if wdio is created, we need to wait for it to end
        if (sauceDisconnected && wdioDone) {
            done(error);
        }
    } else {
        //  if wdio is not created yet, no waiting
        if (sauceDisconnected) {
            done(error);
        }
    }
}

module.exports = function (cf, cb) {
    
    //  init
    init();
    configFile = cf;
    done = cb;

    //  log
    util.logTestRun(WEBDRIVER, configFile);

    //  get config
    config = require(configFile);

    //  setup server
    if (isServerDefined()) {
        server = config.server.app.listen(config.server.port, ServerUpHandler);
    } else {
        ServerUndefinedHandler();
    }

    //  setup sauce

    if (isSauceRequired()) {
        sc = SauceConnect(config.config.user, config.config.key, SauceConnectedHandler, SauceDisconnectedHandler, SauceErrorHandler);
    } else {
        SauceUnrequiredHandler();
    }

    //  setup clean up
    process.on('exit', function() {
        cleanUp();
    });

    process.on('SIGINT', function() {
        process.exit();
    })

    //  setup clean up
    process.on('uncaughtException', function () {
        cleanUp();
    });
}