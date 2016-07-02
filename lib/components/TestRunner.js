const RunTest = require('./RunTest');
const _ = require('lodash');

//  This runs multi tests async with all kinds of config files (Karma / WebdriverIO / Mocha)
module.exports = function(configFiles, allTasksFinishedCallback) {
    runSync(configFiles, allTasksFinishedCallback);
}

var runSync = function (configFiles, allTasksFinishedCallback) {
    var counter = 0;
    var queue = _.cloneDeep(configFiles);
    var runTestRec = function () {
        counter++;
        console.log(`TestRunner Task: ${counter} of ${configFiles.length}`);
        var configFile = queue.shift();
        if (queue.length === 0) {
            RunTest(configFile, allTasksFinishedCallback);
        } else {
            RunTest(configFile, function () {
                runTestRec()
            });
        }
    }
    if (queue.length > 0) {
        runTestRec(queue);
    } else {
        allTasksFinishedCallback();
    }
}

var runAsync = function(configFiles, allTasksFinishedCallback) {
    //  init
    GLOBAL.FINISHED_TEST_TASK = 0;
    GLOBAL.TOTAL_TEST_TASK = configFiles.length;

    //  this callback is called every time a single test task is finished
    var taskFinishedCallback = function() {

        //  finished task counter increment
        GLOBAL.FINISHED_TEST_TASK = GLOBAL.FINISHED_TEST_TASK + 1;

        //  if all tasks finished
        if(GLOBAL.TOTAL_TEST_TASK >= GLOBAL.TOTAL_TEST_TASK) {

          //  all tasks finished
          allTasksFinishedCallback();
        }
    }

    //  fire tasks
    for(var i=0; i<GLOBAL.TOTAL_TEST_TASK; i++) {

        //  fire task
        var configFile = configFiles[i];
        RunTest(configFile, taskFinishedCallback);
    }
}