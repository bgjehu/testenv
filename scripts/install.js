const colors = require('colors');
function install(app) {
    const path = require('path');
    const fs = require('fs');
    var localBin, globalBin, scriptCode;
    localBin = path.resolve(__dirname, `../bin/${app}`);
    globalBin = `/usr/local/bin/${app}`;
    scriptCode = `#!/usr/bin/env node\nrequire('${localBin}')();`;
    fs.writeFile(globalBin, scriptCode, {mode:0o755}  , function(err){
        if (err) throw err;
        console.log(`${app} installed in ${globalBin}`.green); 
    });
}
console.log('Using sudo to install command line...'.yellow);
install('testenv');