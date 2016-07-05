const colors = require('colors');
function uninstall(app) {
    const fs = require('fs');
    var paths = process.env.PATH.split(':');
    for (var i=0; i< paths.length; i++) {
        fs.unlink(`${paths[i]}/${app}`, ()=>{});
    }
}
console.log('Using sudo to uninstall command line...'.yellow);
uninstall('testenv');