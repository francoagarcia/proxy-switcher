const fs = require('fs');
const yargs = require("yargs");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const turnOn = require('./on.js');
const turnOff = require('./off.js');

const argv = yargs
    .command('on', 'Turn ON proxy settings')
    .command('off', 'Turn OFF proxy settings')
    .help()
    .argv;

var command = argv._[0];

switch(command){
    case 'on':
        doOn();
        break;
    case 'off':
        doOff();
        break;
    default:
        console.log("Command not recognized");
}

function doOn(){
    // turnOn.git(config.proxy);
    // turnOn.npm(config.proxy);
    // turnOn.curl(config);
}

function doOff(){
    // turnOff.git();
    // turnOff.npm();
    // turnOff.curl(config);
}

