//  TestTasks runs tests async with all kinds of config files (Karma / WebdriverIO / Mocha)
var singleRunner = require('./singleRunner');
module.exports = function(configFiles, allTasksFinishedCallback) {
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
        new singleRunner(configFile, taskFinishedCallback);
    }

}