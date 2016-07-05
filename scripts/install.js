function install(app) {
    const path = require('path');
    const fs = require('fs');
    var isRoot, localBin, globalBin, paths, scriptCode;
    isRoot = process.getuid() === 0;
    if (isRoot) {
        paths = process.env.PATH.split(':');
        if (paths.length > 0) {
            localBin = path.resolve(__dirname, `../bin/${app}`);
            globalBin = `${paths[0]}/${app}`;
            scriptCode = `#!/usr/bin/env node\nrequire('${localBin}')();`;
            fs.writeFile(globalBin, scriptCode, {mode:0o755}  , function(err){
                if (err) throw err;
                console.log(`${app} installed in ${globalBin}`); 
            });
        } else {
            console.log('No PATH environment variable!');
        }
    } else {
        console.log(`Please install ${app} with root: sudo npm i -D testenv`);
    }
}
install('testenv');