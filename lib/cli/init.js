var fs = require('fs');
var path = require('path');
var prompt = require('../util').cliYesNoPrompt;
var util = require('../util');

module.exports = function () {

    //  determine if old config file exists
    fs.access(path.join(process.cwd(), 'testenv.json'), fs.F_OK, function(err) {
        if (!err) {

            //  file exists
            //  ask if user want to reset the config file
            prompt('WARN: testenv.json exists! Do you want to reset?', createConfig);
        } else {

            //  file doesn't exists
            //  create new config file
            createConfig();
        }
    });    
}

//  write the default config into file
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

    //  stringify the config object
    var configString = JSON.stringify(config, null, 4);

    //  new file in the root
    var targetLocation = path.join(process.cwd(), 'testenv.json');

    //  write it into file
    fs.writeFile(targetLocation, configString, function done(err) {
        if(err){
            //  log if error
            util.logError(err);
        }
    })
}

