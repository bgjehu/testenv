//	Karma configuration
 
//@@BROWSERIFY_ISTANBUL_REQUIRE_STRING
//@@COVERAGE_GET_DIR_STRING
var KarmaConfig = function(config) {
  config.set({

    //  No changed should be made manually above this line
    //  .
    //  .
    //  .



    //  basePath
    //  Type: String
    //  Default: ''
    //  Description: The root path location that will be used to resolve all relative paths
    //	defined in files and exclude. If the basePath configuration is a relative path then 
    //  it will be resolved to the __dirname of the configuration file.
    basePath: '',


    //  frameworks
    //  Type: Array
    //  Default: []
    //  Description: List of test frameworks you want to use. Typically, you will set this 
    //  to ['jasmine'], ['mocha'] or ['qunit']...
    //  Note: Please note just about all frameworks in Karma require an additional plugin/framework 
    //  library to be installed (via NPM). More frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'jasmine',
      //@@BROWSERIFY_FRAMEWORKS_STRING
    ],

    //  files
    //  Type: Array
    //  Default: []
    //  Description: List of files/patterns to include to loaded files.
    files: [
      //  Example:
      // 'src/**/**.js',
      // 'test/**/*.js'
    ],

    //  exclude
    //  Type: Array
    //  Default: []
    //  Description: List of files/patterns to exclude from loaded files.
    exclude: [
    ],

    //  preprocessors
    //  Type: Object
    //  Default: {'**/*.coffee': 'coffee'}
    //  Description: A map of preprocessors to use.
    //  Note: Preprocess matching files before serving them to the browser
    //  More preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      //  Example:
      // 'src/**/**.js': ['browserify'],
      // 'test/**/*.js': ['browserify']
    },

    //  browsers
    //  Type: Array
    //  Default: []
    //  CLI: --browsers Chrome,Firefox
    //  Possible Values: Chrome || ChromeCanary || PhantomJS || Firefox || Opera || IE || Safari
    //	Description: A list of browsers to launch and capture. When Karma starts up, it will also 
    //  start up each browser which is placed within this setting. Once Karma is shut down, it 
    //  will shut down these browsers as well. You can capture any browser manually by opening 
    //  the browser and visiting the URL where the Karma web server is listening 
    //  (by default it is http://localhost:9876/).
    browsers: ['PhantomJS', 'Firefox', 'Chrome'],

    //  plugins
    //	Type: Array
    //	Default: ['karma-*']
    //	Description: List of plugins to load. A plugin can be a string (in which case it will be 
    //  required by Karma) or an inlined plugin - Object. By default, Karma loads all sibling NPM 
    //  modules which have a name starting with karma-*.
    //  Note: More details in http://karma-runner.github.io/0.13/config/plugins.html
    plugins: [
      require('testenv').karma_chrome_launcher,
      require('testenv').karma_firefox_laucher,
      require('testenv').karma_phantomjs_launcher,
      require('testenv').karma_jasmine,
      //@@BROWSERIFY_PLUGINS_STRING
      //@@BROWSERIFY_ISTANBUL_PLUGINS_STRING
      //@@KARMA_COVERAGE_PLUGINS_STRING
    ],

    

    browserify: {
        debug: true,
        transform: [
          //@@BABELIFY_BROWSERIFY_CONFIG_STRING
          //@@BROWSERIFY_ISTANBUL_OPEN_STRING
            //@@INSTRUMENTER_EMBEDSOURCE_CONFIG_STRING
          //@@BROWSERIFY_ISTANBUL_CLOSE_STRING
        ]
    },

    //  reporters
    //	Type: Array
    //	Default: ['progress']
    //	CLI: --reporters progress,growl
    //	Possible Values: dots || progress
    //	Description: A list of reporters to use.
    //  Note: reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
        'dots',
        //@@COVERAGE_REPORTER_STRING
    ],

    coverageReporter: {
            reporters : [
                //@@COVERAGE_TEXT_REPORTER_STRING
                //@@COVERAGE_HTML_REPORTER_STRING
            ]
    },

    //  port
    //  Type: Number
    //  Default: 9876
    //  CLI: --port 9876
    //  Description: The port where the web server will be listening.

    //  colors
    //  Type: Boolean
    //  Default: true
    //  CLI: --colors, --no-colors
    //  Description: Enable or disable colors in the output (reporters and logs).
    
    //  logLevel
    //  Type: String
    //  Default: 'INFO'
    //  CLI: --log-level debug
    //  Value: OFF || ERROR || WARN || INFO || DEBUG
    //  Description: Level of logging.



    //  autoWatch
    //	Type: Boolean
    //	Default: true
    //	CLI: --auto-watch, --no-auto-watch
    //	Description: Enable or disable watching files and executing the tests whenever one of these files changes.
    autoWatch: false,

    //  singleRun
    //	Type: Boolean
    //	Default: false
    //	CLI: --single-run, no-single-run
    //	Description: Continuous Integration mode.
    //	Note: If true, Karma will start and capture all configured browsers, run tests and then exit with an exit 
    //  code of 0 or 1 depending on whether all tests passed or any tests failed.
    //	Continuous Integration mode
    singleRun: true

    //	concurrency
    //	Type: Number
    //  Default: Infinity
    //  Description: How many browser Karma launches in parallel.
    //  Especially on sevices like SauceLabs and Browserstack it makes sense to only launch a limited amount of 
    //  browsers at once, and only start more when those have finished. Using this configuration you can sepcify 
    //  how many browsers should be running at once at any given point in time.



	  //  . 
    //  .
    //  .
    //  No changed should be made manually below this line
  })
}
KarmaConfig.testRunner = 'KARMA';
module.exports = KarmaConfig;
