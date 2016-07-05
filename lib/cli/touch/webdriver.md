# Webdriver Config File

## Create the config file

```
testenv touch <new-config-file-0> <new-config-file-1> <...> -w
```

upon creating the files, you will be ask to choose options for
* Do you want to use Sauce Labs for testing? (if yes, ```'sauce'``` would be added to ```services```, but you have to set up ```user``` and ```key``` manually. [Sign up for Sauce Lab](https://saucelabs.com/signup/trial))

## Configs that you may want to change

### server

if you have a [Express JS App](http://expressjs.com/) to serve your static contents that your want to test. You could specify your app and port in ```server``` in the config file. An instance of the app would be created during testing.

Example:

```app.js```:

```
var app = require('express')();
.
.   app setting
.
module.exports = app;
```

```config.js```

```
    .
    .   other config
    .
    server: {
        app: require('app.js'),
        port: process.env.PORT || 3000
    },
    .
    .   other config
    .
```

### specs

Your definitely want do put in your file paths or patterns for the test spec files in ```specs``` for it was empty from ```testenv touch```.

### exclude

```exclude``` is basically the same thing with ```specs```, except it excludes the specs files.

### capabilities

You may want to specify what platforms and browsers you want for testing. The default from ```testenv touch``` is

```
capabilities: [
    {
        browserName: 'chrome',
        platform: 'Windows 10',
        version: '51.0'
    },
    {
        browserName: 'firefox',
        platform: 'OS X 10.10',
        version: '44.0'
    },
]
```

which is arbitrary. To specify yours, check out more options on [Sauce Labs Platform Configurator](https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/).

### logLevel
```['PhantomJS', 'Firefox', 'Chrome']``` is default from ```testenv touch```. You may want to change it.