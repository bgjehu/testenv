/*
    Note:	there are two kinds config file. First one is the test config file, created by user manually or thru CLI to specify how they want their tests to be run.
            usually with name '***.config.js'. The second one is the testevn config file. It is named testenv.json in the root, work like a package.json. It used to
            specify the setting of testenv.
*/

const path = require('path');
const _ = require('lodash');
const dependencies = _.keys(require('./package.json').dependencies);
// const dependencies = ['karma-chrome-launcher', 'karma-firefox-launcher', 'karma-phantomjs-launcher', 'karma-jasmine', 'karma-browserify', 'browserify-istanbul', 'karma-coverage', 'express'];
var frameworks = _.zipObject(
    //  keys
    _.map(dependencies, function (m) {
        return m.split('-').join('_');
    }),
    //  values
    _.map(dependencies, function (m) {
        return require(m) || require(path.resolve(__dirname, `./node_modules/${m}`));
    })
);
module.exports = frameworks;