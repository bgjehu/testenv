const _ = require('lodash');
const prompt = require('../../util').cliYesNoPrompt;

module.exports = {
    webdriver: {
        usingSauce: false
    },
    replacements: {
        SAUCE_CONFIG_SERVICES_STRING: '\'sauce\',',
        SAUCE_CONFIG_USER_STRING: 'user: \'\',',
        SAUCE_CONFIG_KEY_STRING: 'key: \'\','
    },
    updateConfig: function (config, next) {
        prompt('Do you want to use Sauce Labs for testing?', function(){
            config.webdriver.usingSauce = true;
        }, null, function(){
            next(config);
        });
    },
    processConfig: function (config, next) {
        //  injections
        var template = config.template;
        var inject = config.inject;
        if (config.webdriver.usingSauce) {
            template = inject(template, 'SAUCE_CONFIG_SERVICES_STRING');
            template = inject(template, 'SAUCE_CONFIG_USER_STRING');
            template = inject(template, 'SAUCE_CONFIG_KEY_STRING');
        }
        
        //  clean up
        _.map(_.keys(config.replacements), function (key) {
            template = config.cleanUp(template, key);
        })

        //  store back to config
        config.output = template;

        //  next
        next(config);
    }
    
}

