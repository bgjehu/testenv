var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var prompt = require('../util').cliYesNoPrompt;

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

var replacements = {
    BROWSERIFY_ISTANBUL_REQUIRE_STRING: 'var istanbul = require(\'browserify-istanbul\');\n',
    BROWSERIFY_FRAMEWORKS_STRING: '\'browserify\',\n',
    BROWSERIFY_PLUGINS_STRING: 'require(\'karma-browserify\'),\n',
    BROWSERIFY_ISTANBUL_PLUGINS_STRING: 'require(\'browserify-istanbul\'),\n',
    KARMA_COVERAGE_PLUGINS_STRING: 'require(\'karma-coverage\'),\n',
    BABELIFY_BROWSERIFY_CONFIG_STRING: '\'babelify\',\n',
    BROWSERIFY_ISTANBUL_OPEN_STRING: 'istanbul({\n',
    BROWSERIFY_ISTANBUL_CLOSE_STRING: '}),\n',
    INSTRUMENTER_EMBEDSOURCE_CONFIG_STRING: 'instrumenterConfig: { embedSource: true }\n',
    COVERAGE_REPORTER_STRING: '\'coverage\',\n',
    COVERAGE_TEXT_REPORTER_STRING: '{\'type\': \'text\'},\n',
    COVERAGE_GET_DIR_STRING: 'var coverageDir = require(\'path\').join(process.cwd(),\'coverage\');\n',
    COVERAGE_HTML_REPORTER_STRING: '{\'type\': \'html\', dir: coverageDir},\n'
}

var config;

module.exports = function (paths) {
    config = {
        usingReact: false,
        showCoverage: false,
        coverageHtmlReport: false,
        paths: paths,
        template: null, 
        output: null
    };
    getTemplate(function () {
        getConfig(function () {
            processInputs(
                writeConfigFile
            );
        });
    });
}

var getTemplate = function(callback){
    fs.readFile(path.resolve(__dirname, './template/karma.conf.js'), 'utf8', function (ex, data) {
        if (ex) {
            console.log('Missing Karma Config Template');
            throw ex;
        } else {
            config.template = data;
            callback();
        }
    })
}

var getConfig = function(callback) {
    prompt('Are you using React JS in your source code?', function yes() {
        config.usingReact = true;
    }, null, function end() {
        prompt('Do you want code coverage to be shown?', function yes() {
            config.showCoverage = true;
            prompt('Do you want code coverage report in HTML', function yes() {
                config.coverageHtmlReport = true;
            }, null, function end() {
                callback();    
            });
        }, function no() {
            callback();
        });
    });
}

var processInputs = function (callback) {
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
    callback();
}

var writeConfigFile = function() {
    if (typeof config.paths === 'array') {
        var exs = [];
        _.map(config.paths, function(path){
            fs.writeFile(path, config.output, function(ex){
                if(ex) {
                    exs.push(ex);
                } else {
                    console.log('Create Karma Config File: ' + path);
                }
            })
        });
        _.map(exs, function (ex) {
            console.log(ex.message);
        })
    } else if (typeof config.paths === 'string') {
        fs.writeFile(config.paths, config.output, function(ex){
                if(ex) {
                    throw ex
                } else {
                    console.log('Create Karma Config File: ' + config.paths);
                }
            })
    } else {
        console.log('ERROR: Invalid Path(s).');
    }
}


var inject = function (template, target) {
    return template.replace('//@@' + target, replacements[target]);
}

var cleanUp = function (text, target){
    return text.replace('//@@' + target, '');
}