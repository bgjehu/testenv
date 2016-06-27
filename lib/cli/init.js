var fs = require('fs');
var path = require('path');
var prompt = require('../util').cliYesNoPrompt;

module.exports = function () {
    //  get config file location
    var targetLocation = path.join(process.cwd(), 'testenv.json');
    //  determine if config file exists
    fs.access(targetLocation, fs.F_OK, function(err) {
        if (!err) {
            //  file exists
            //  create readline interface
            prompt('WARN: testenv.json exists! Do you want to reset?', createConfig);
        } else {
            //  file doesn't exists
            //  create new config file
            createConfig();
        }
    });    
}

var createConfig = function () {
    //  default testenv config
    var config = {
        client_uni: [
            "./test/client/uni/test.conf.js"
        ],
        client_int: [
            "./test/client/int/test.conf.js"
        ],
        client_e2e: [
            "./test/client/e2e/test.conf.js"
        ],
        server_uni: [
            "./test/server/uni/test.conf.js"
        ],
        server_int: [
            "./test/server/int/test.conf.js"
        ],
        server_e2e: [
            "./test/server/e2e/test.conf.js"
        ],
        client: [
            "./test/client/uni/test.conf.js", 
            "./test/client/int/test.conf.js",
            "./test/client/e2e/test.conf.js"
        ],
        server: [
            "./test/server/uni/test.conf.js", 
            "./test/server/int/test.conf.js",
            "./test/server/e2e/test.conf.js"
        ],
        all: [
            "./test/client/uni/test.conf.js", 
            "./test/client/int/test.conf.js",
            "./test/client/e2e/test.conf.js",
            "./test/server/uni/test.conf.js", 
            "./test/server/int/test.conf.js",
            "./test/server/e2e/test.conf.js"
        ]
    };
    //  stringify
    var configString = JSON.stringify(config, null, 4);
    //  file in root path
    var targetLocation = path.join(process.cwd(), 'testenv.json');
    //  write file
    fs.writeFile(targetLocation, configString, function done(err) {
        if(err){
            //  report error
            console.log(err);
        }
    })
}

