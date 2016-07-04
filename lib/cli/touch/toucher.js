const _ = require('lodash');
const path = require('path');
const fs = require('fs');

const init = function (config, next) {
    next(
        _.assign(
            {
                testRunner: null,
                replacements: null,
                outputPaths: null,
                templatePath: null,
                template: null,
                output: null,
            }, config)
    );
}

module.exports = function (paths, testRunner) {
    //  pre init
    var config = require('./' + testRunner.toLowerCase());
    config.testRunner = testRunner;
    config.templatePath = path.resolve(__dirname, `./template/${config.testRunner.toLowerCase()}.conf.js`);
    config.outputPaths = paths;
    

    //  utility functions
    config.inject = function (template, target) {
        return template.replace(`//@@${target}`, config.replacements[target]);
    }
    config.cleanUp = function (text, target){
        return text.replace(`//@@${target}`, '');
    }
    

    //  start toucher
    init(config, function (config) {    //  init to unified config object
        getTemplate(config, function (config) {
            config.updateConfig(config, function (config) {
                config.processConfig(config, function (config) {
                    writeConfig(config);
                })
            })
        })
    });
}

const getTemplate = function(config, next){
    //  try to read template file
    fs.readFile(config.templatePath, 'utf8', function (err, data) {
        if (err) {
            //  failed, report error
            console.log(`Missing ${config.testRunner} Config Template. Try reinstall the package!`);
            process.exit(1);
        } else {
            //  got template, store in config object
            config.template = data;
            //  call next step
            next(config);
        }
    })
}

const writeConfig = function(config) {
    //  determine if there is only one file to write or more
    if (typeof config.outputPaths === 'array' || typeof config.outputPaths === 'object') {
        //  more than one file
        var errOjbs = [];
        _.map(config.outputPaths, function(path){
            fs.writeFile(path, config.output, function(err){
                if(err) {
                    //  save error for report later
                    errOjbs.push({path: path, msg: err.message});
                    util.logError(err);
                } else {
                    //  file created
                    console.log('Create Karma Config File: ' + path);
                }
            })
        });
        
        //  report stored error
        _.map(errOjbs, function (errOjb) {
            console.log('Did not create Karma Config File in: ' + errOjb.path + ' for Error: <' + errOjb.msg + '>.');
        });

    } else if (typeof config.outputPaths === 'string') {
        //  only one file
        fs.writeFile(config.outputPaths, config.output, function(err){
                if(err) {
                    util.logError(err);
                } else {
                    console.log('Create Karma Config File: ' + config.outputPaths);
                }
            })
    } else {
        console.log('ERROR: Invalid Path(s).');
    }
}