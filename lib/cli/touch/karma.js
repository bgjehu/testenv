const _ = require('lodash');
const prompt = require('../../util').cliYesNoPrompt;

module.exports = {
    karma: {
        usingReact: false,
        showCoverage: false,
        coverageHtmlReport: false
    },
    replacements: {
        BROWSERIFY_ISTANBUL_REQUIRE_STRING: 'var istanbul = require(\'testenv\').browserify_istanbul;',
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
    },
    updateConfig: function (config, next) {
        prompt('Are you using React JS in your source code?', function yes() {
            config.karma.usingReact = true;
        }, null, function end() {
            prompt('Do you want code coverage to be shown?', function yes() {
                config.karma.showCoverage = true;
                prompt('Do you want code coverage report in HTML?', function yes() {
                    config.karma.coverageHtmlReport = true;
                }, null, function end() {
                    next(config);    
                });
            }, function no() {
                next(config);
            });
        });
    },
    processConfig: function (config, next) {
        //  injections
        var template = config.template;
        var inject = config.inject;
        if (config.karma.usingReact || config.karma.showCoverage) {
            template = inject(template, 'BROWSERIFY_FRAMEWORKS_STRING');
            template = inject(template, 'BROWSERIFY_PLUGINS_STRING');
        }
        if (config.karma.usingReact) {
            template = inject(template, 'BABELIFY_BROWSERIFY_CONFIG_STRING');
        }
        if (config.karma.showCoverage) {
            template = inject(template, 'BROWSERIFY_ISTANBUL_REQUIRE_STRING');
            template = inject(template, 'BROWSERIFY_ISTANBUL_PLUGINS_STRING');
            template = inject(template, 'KARMA_COVERAGE_PLUGINS_STRING');
            template = inject(template, 'BROWSERIFY_ISTANBUL_OPEN_STRING');
            template = inject(template, 'BROWSERIFY_ISTANBUL_CLOSE_STRING');
            template = inject(template, 'COVERAGE_REPORTER_STRING');
            template = inject(template, 'COVERAGE_TEXT_REPORTER_STRING');
        }
        if (config.karma.usingReact && config.karma.showCoverage) {
            template = inject(template, 'INSTRUMENTER_EMBEDSOURCE_CONFIG_STRING');
        }
        if (config.karma.coverageHtmlReport) {
            template = inject(template, 'COVERAGE_GET_DIR_STRING');
            template = inject(template, 'COVERAGE_HTML_REPORTER_STRING');
        }
        _.map(_.keys(config.replacements), function (key) {
            template = config.cleanUp(template, key);
        })

        config.output = template;
        next(config);
    }
    
}

