var util = require('../util');

module.exports = function(configFile, callback) {

    //  log
    util.logTestRun(configFile,'Mocha');

    //  get modules
    var path = require('path');
    var gulp = require('gulp');
    var mocha = require('gulp-mocha');

    //  get config object from config file
    var config = require(configFile);

    //  set Global expect variable as chai assertion library in expect style, so test spec coded in chai could run
    GLOBAL.expect = require('chai').expect;

    //  init
    var src = [];

    //  resolved included files
    for(var i = 0; i<config.files.length; i++) {
      //  resolving included file based on location of config file, configured basePath
      src.push(path.resolve(configFile, '..', config.basePath, config.files[i]));
    }

    //  resolved excluded files
    for(var i = 0; i<config.exclude.length; i++) {
      //  resolving excluded file based on location of config file, configured basePath
      src.push('!' + path.resolve(configFile, '..', config.basePath, config.exclude[i]));
    }

    //  pipe included testfile with config to Mocha
    gulp.src(src)
        .pipe(mocha(config));
}