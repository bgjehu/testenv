const colors = require('colors');
const os = require('os');
function installOnMac(app) {
    const path = require('path');
    const fs = require('fs');
    var globalBin, scriptCode;
    globalBin = `/usr/local/bin/${app}`;
    scriptCode = `#!/usr/bin/env node\nrequire('${__dirname}/../lib/cli')();`;
    fs.writeFile(globalBin, scriptCode, {mode:0o755}  , function(err){
        if (err) throw err;
        console.log(`${app} installed in ${globalBin}`.green); 
    });
}
console.log('Using sudo to install command line...'.yellow);
if (os.platform() === 'darwin') {
    installOnMac('testenv');
}