const colors = require('colors');
function install(app) {
    const path = require('path');
    const fs = require('fs');
    var localBin, globalBin, paths, scriptCode;
    paths = process.env.PATH.split(':');
    if (paths.length > 0) {
        localBin = path.resolve(__dirname, `../bin/${app}`);
        globalBin = `${paths[0]}/${app}`;
        scriptCode = `#!/usr/bin/env node\nrequire('${localBin}')();`;
        fs.writeFile(globalBin, scriptCode, {mode:0o755}  , function(err){
            if (err) throw err;
            console.log(`${app} installed in ${globalBin}`.green); 
        });
    } else {
        console.log('No PATH environment variable!');
    }
}
console.log('Using sudo to install command line...'.yellow);
install('testenv');