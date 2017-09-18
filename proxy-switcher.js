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

/**
 * TODO
 * 
 * Eliminar el on.js y el off.js ? Que solo quede el proxy-switcher.js y desde ahí se invoque todo.
 * Ver el tema de customizar cada programa
 */

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
    turnOff.system(config);
    turnOff.git(config);
    turnOff.npm(config);
    turnOff.curl(config);
    turnOff.maven(config);
}

