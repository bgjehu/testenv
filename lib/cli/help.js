module.exports = function () {
    //  static help info
    const help_tips = 'Usage: \n' + 
                '\t' + 'testenv <command>\n' +  
                    '\n' + 
                  'Commands:\n' + 
                '\t' + 'touch [<targetLocation>] [<options>] Create default config file.\n' + 
                '\t' + '\t' + 'options:\n' +
                '\t' + '\t' + '\t' + '-k Create karma config file.\n' +
                '\t' + '\t' + '\t' + '-w Create webdriver config file.\n' +
                '\t' + '\t' + '\t' + '-m Create mocha config file.\n' + 
                '\t' + 'run [<options>] Run preset test in testenv.json file.\n' +
                '\t' + '\t' + 'options:\n' +
                '\t' + '\t' + '\t' + '-c Run client test.\n' +
                '\t' + '\t' + '\t' + '-s Run server test.\n' +
                '\t' + '\t' + '\t' + '-u Run unit test.\n' +
                '\t' + '\t' + '\t' + '-i Run integration test.\n' +
                '\t' + '\t' + '\t' + '-e Run end-to-end test.\n' +
                '\t' + '\t' + '\t' + '-a Run all test.\n' +
                '\t' + 'run [<configFile_1>] [<configFile_2>]... Run tests with config file(s).\n';
    console.log(help_tips);
    process.exit(0)
}