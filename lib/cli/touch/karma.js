var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var util = require('../../util');
var prompt = util.cliYesNoPrompt;


//  constants
const BROWSERIFY_ISTANBUL_REQUIRE_STRING = 'BROWSERIFY_ISTANBUL_REQUIRE_STRING';
const BROWSERIFY_FRAMEWORKS_STRING = 'BROWSERIFY_FRAMEWORKS_STRING';
const BROWSERIFY_PLUGINS_STRING = 'BROWSERIFY_PLUGINS_STRING';
const BROWSERIFY_ISTANBUL_PLUGINS_STRING = 'BROWSERIFY_ISTANBUL_PLUGINS_STRING';
const KARMA_COVERAGE_PLUGINS_STRING = 'KARMA_COVERAGE_PLUGINS_STRING';
const BABELIFY_BROWSERIFY_CONFIG_STRING = 'BABELIFY_BROWSERIFY_CONFIG_STRING';
const BROWSERIFY_ISTANBUL_OPEN_STRING = 'BROWSERIFY_ISTANBUL_OPEN_STRING';
const BROWSERIFY_ISTANBUL_CLOSE_STRING = 'BROWSERIFY_ISTANBUL_CLOSE_STRING';
const INSTRUMENTER_EMBEDSOURCE_CONFIG_STRING = 'INSTRUMENTER_EMBEDSOURCE_CONFIG_STRING';
const COVERAGE_REPORTER_STRING = 'COVERAGE_REPORTER_STRING';
const COVERAGE_TEXT_REPORTER_STRING = 'COVERAGE_TEXT_REPORTER_STRING';
const COVERAGE_GET_DIR_STRING = 'COVERAGE_GET_DIR_STRING';
const COVERAGE_HTML_REPORTER_STRING = 'COVERAGE_HTML_REPORTER_STRING';

//  replacements(injections) in karma config file template
var replacements = {
    BROWSERIFY_ISTANBUL_REQUIRE_STRING: 'var istanbul = require(\'browserify-istanbul\');',
    BROWSERIFY_FRAMEWORKS_STRING: '\'browserify\',',
    BROWSERIFY_PLUGINS_STRING: 'require(\'karma-browserify\'),',
    BROWSERIFY_ISTANBUL_PLUGINS_STRING: 'require(\'browserify-istanbul\'),',
    KARMA_COVERAGE_PLUGINS_STRING: 'require(\'karma-coverage\'),',
    BABELIFY_BROWSERIFY_CONFIG_STRING: '\'babelify\',',
    BROWSERIFY_ISTANBUL_OPEN_STRING: 'istanbul({',
    BROWSERIFY_ISTANBUL_CLOSE_STRING: '}),',
    INSTRUMENTER_EMBEDSOURCE_CONFIG_STRING: 'instrumenterConfig: { embedSource: true }',
    COVERAGE_REPORTER_STRING: '\'coverage\',',
    COVERAGE_TEXT_REPORTER_STRING: '{\'type\': \'text\'},',
    COVERAGE_GET_DIR_STRING: 'var coverageDir = require(\'path\').join(process.cwd(),\'coverage\');',
    COVERAGE_HTML_REPORTER_STRING: '{\'type\': \'html\', dir: coverageDir},'
}

var config;

module.exports = function (paths) {
    //  init config
    config = {
        usingReact: false,
        showCoverage: false,
        coverageHtmlReport: false,
        paths: paths,
        template: null, 
        output: null
    };
    //  get template first, in case template is missing or deleted accidentally
    getTemplate(function () {
        //  update config with user's inputs
        updateConfig(function () {
            //  process config (injections happens)
            processConfig(
                //  write config file
                writeConfigFile
            );
        });
    });
}

var getTemplate = function(next){
    //  try to read template file
    fs.readFile(path.resolve(__dirname, './template/karma.conf.js'), 'utf8', function (err, data) {
        if (err) {
            //  failed, report error
            console.log('Missing Karma Config Template. Try reinstall the package!');
            process.exit(1);
        } else {
            //  got template, store in config object
            config.template = data;
            //  call next step
            next();
        }
    })
}

var updateConfig = function(next) {
    //  update config object with user's inputs
    prompt('Are you using React JS in your source code?', function yes() {
        config.usingReact = true;
    }, null, function end() {
        prompt('Do you want code coverage to be shown?', function yes() {
            config.showCoverage = true;
            prompt('Do you want code coverage report in HTML', function yes() {
                config.coverageHtmlReport = true;
            }, null, function end() {
                next();    
            });
        }, function no() {
            next();
        });
    });
}

var processConfig = function (next) {
    //  injections
    var str = config.template;
    if (config.usingReact || config.showCoverage) {
        str = inject(str, BROWSERIFY_FRAMEWORKS_STRING);
        str = inject(str, BROWSERIFY_PLUGINS_STRING);
    }
    if (config.usingReact) {
        str = inject(str, BABELIFY_BROWSERIFY_CONFIG_STRING);
    }
    if (config.showCoverage) {
        str = inject(str, BROWSERIFY_ISTANBUL_REQUIRE_STRING);
        str = inject(str, BROWSERIFY_ISTANBUL_PLUGINS_STRING);
        str = inject(str, KARMA_COVERAGE_PLUGINS_STRING);
        str = inject(str, BROWSERIFY_ISTANBUL_OPEN_STRING);
        str = inject(str, BROWSERIFY_ISTANBUL_CLOSE_STRING);
        str = inject(str, COVERAGE_REPORTER_STRING);
        str = inject(str, COVERAGE_TEXT_REPORTER_STRING);
    }
    if (config.usingReact && config.showCoverage) {
        str = inject(str, INSTRUMENTER_EMBEDSOURCE_CONFIG_STRING);
    }
    if (config.coverageHtmlReport) {
        str = inject(str, COVERAGE_GET_DIR_STRING);
        str = inject(str, COVERAGE_HTML_REPORTER_STRING);
    }
    _.map(_.keys(replacements), function (key) {
        str = cleanUp(str, key);
    })
    config.output = str;
    next();
}

var writeConfigFile = function() {
    //  determine if there is only one file to write or more
    if (typeof config.paths === 'array') {
        //  more than one file
        var errOjbs = [];
        _.map(config.paths, function(path){
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

    } else if (typeof config.paths === 'string') {
        //  only one file
        fs.writeFile(config.paths, config.output, function(err){
                if(err) {
                    util.logError(err);
                } else {
                    console.log('Create Karma Config File: ' + config.paths);
                }
            })
    } else {
        console.log('ERROR: Invalid Path(s).');
    }
}

//  utility functions
var inject = function (template, target) {
    return template.replace('//@@' + target, replacements[target]);
}

var cleanUp = function (text, target){
    return text.replace('//@@' + target, '');
}