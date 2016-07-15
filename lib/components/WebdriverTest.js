const Selenium = require('./Selenium');
const SauceConnect = require('./SauceConnect');
const WebdriverIO = require('./WebdriverIO');
const util = require('../util');
const WEBDRIVER = require('../constant').TESTRUNNER.WEBDRIVER;
const colors = require('colors');

var server,         //  server child process
    serverReady,    //  server ready indicator
    browserReady,   //  browser ready indicator
    sc,             //  sauce connect child process
    wdio,           //  webdirverio child process
    selenium,       //  selenium standalone child process
    obj,            //  config object
    configFile,     //  config file
    done,           //  test end callback
    error,          //  error storage
    sauceDisconnected,  //  sauce disconnected indicator
    wdioDone;       //  webdirverio done indicator

const init = function () {
    server = null;
    serverReady = false;
    browserReady = false;
    sc = null;
    wdio = null;
    obj = null;
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
        return obj.server.app && obj.server.port;
    } catch (err) {
        return false;
    }
}

const isSauceRequired = function () {
    try {
        return obj.config.services.indexOf('sauce') > -1 && obj.config.user && obj.config.key;
    } catch (err) {
        return false;
    }
}

const log = function (str) {
    console.log(`WebdriverTest: ${str}`);
}

const SIGNEXT = function () {
    if (serverReady && browserReady) {
        wdio = WebdriverIO(configFile, function finished() {
            //  wdio finished
            wdioDone = true;
            if (server) server.close();
            if (sc) sc.kill();
            if (selenium) selenium.kill();
            SIGDONE();
        }, function error(err) {
            //  wdio error
            error = error || err;
            if (server) server.close();
            if (sc) sc.kill();
            if (selenium) selenium.kill();
        });
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

    //  get obj
    obj = require(configFile);

    //  setup server
    if (isServerDefined()) {
        server = obj.server.app.listen(obj.server.port, function() {
            //  server is up and ready
            serverReady = true;
            log(`Server is listening to port ${obj.server.port}.`.green);
            SIGNEXT();
        });
    } else {
        //  server undefined, count as ready
        serverReady = true;
        log('Server is undefined.'.yellow);
        SIGNEXT();
    }

    //  setup sauce

    if (isSauceRequired()) {
        sc = SauceConnect(obj.config.user, obj.config.key, function connected() {
            //  sc connected
            browserReady = true;
            seleniumReady = true;
            log('Sauce connected.'.green);
            SIGNEXT();
        }, function disconnected() {
            //  sc disconnected
            sauceDisconnected = true;
            SIGDONE();
        }, function error(err) {
            error = error || err;
            if (server) server.close();
            if (wdio) wdio.kill();
        });
    } else {
        
        //  sauce connect is not required
        sauceDisconnected = true;
        log('Sauce is not required'.yellow);

        //  install and start selenium-standalone

        Selenium(function (err, child) {
            if (err) {
                error = error || err;
                if (server) server.close();
            } else {
                selenium = child;
                browserReady = true;
                SIGNEXT();
            }
        })
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