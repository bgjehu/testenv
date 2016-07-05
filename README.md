# testenv



## Install
You may want to install this globally for your convenience. The init create a testenv.json for configurating preset command.
```
npm install testenv -g
testenv init
```



## Create Default Test Config File (Karma|Webdriver|Mocha)
```
testenv touch [<new-config-file-location>] [-k|-w|-m]
```

[More about Karma Config File](/lib/cli/touch/karma.md)

[More about Webdriver Config File](/lib/cli/touch/webdriver.md)



## Run Custom Test Config File
```
testenv run [<config-file>]
```



## Run Preset Test Config File
```testenv run -c``` to run client side testings.

```testenv run -s``` to run server side testings.

```testenv run -e``` to run end-to-end testings.

```testenv run -a``` to run all testings.

```testenv run -u``` to run unit testings.

```testenv run -i``` to run integration testings.

You could combine options [-u|-i] with options [-c|-s]. For example: to run client side unit testing.

Use ```testenv run -cu```