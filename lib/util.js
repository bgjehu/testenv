var readline = require('readline');

exports.cliYesNoPrompt = function(question, yesCallback, noCallback, endCallback) {
    var rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
    var prompt = function(rl) {
        rl.question(question + ' (Y/N)\n', function(ans) {
            switch (ans) {
                case 'Y':
                case 'y':
                    rl.close();
                    if (yesCallback) yesCallback();
                    if (endCallback) endCallback();
                    break;
                case 'N':
                case 'n':
                    rl.close();
                    if (noCallback) noCallback();
                    if (endCallback) endCallback();
                    break;
                default:
                    console.log('ERROR: Invalid Input')
                    prompt(rl);
                    break;
            }
        });
    }
    prompt(rl);
}