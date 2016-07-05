function uninstall(app) {
    const fs = require('fs');
    var paths = process.env.PATH.split(':');
    if (process.getuid() === 0) {
        for (var i=0; i< paths.length; i++) {
            fs.unlink(`${paths[i]}/${app}`, ()=>{});
        }
    } else {
        console.log(`Please uninstall ${app} with root: sudo npm un -D testenv`);
    }
}
uninstall('testenv');