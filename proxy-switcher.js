const fs = require('fs');
const yargs = require("yargs");
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const turnOn = require('./on.js');
const turnOff = require('./off.js');

const argv = yargs
    .command('on', 'Turn ON all proxy settings')
    .command('off', 'Turn OFF all proxy settings')
    .help()
    .argv;

var command = argv._[0];

switch (command) {
    case 'on':
        doOn();
        break;
    case 'off':
        doOff();
        break;
    default:
        console.log("Command not recognized");
}

function doOn() {
    turnOn.system(config);
    turnOn.git(config);
    turnOn.npm(config);
    turnOn.curl(config);
    turnOn.maven(config);
}

function doOff() {
    turnOff.system();
    turnOff.git();
    turnOff.npm();
    turnOff.curl(config);
    turnOff.maven(config);
}

