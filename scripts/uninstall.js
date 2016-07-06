const colors = require('colors');
function uninstall(app) {
    const fs = require('fs');
    fs.unlink(`/usr/local/bin/${app}`, ()=>{});
}
console.log('Using sudo to uninstall command line...'.yellow);
uninstall('testenv');