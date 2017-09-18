const fs = require('fs');
const exec = require('child_process').exec;
const utils = require('./utils.js');
const xml2js = require('xml2js');
const parseString = require('xml2js').parseString;

let log = (error, stdout, stderr) => console.log(stdout, stderr);

module.exports = {
    system,
    git,
    npm,
    curl,
    maven
};

function system() {
    utils.turnSystemProxy(false);
}

function git() {
    exec("git config --global --unset http.proxy", log);
    exec("git config --global --unset https.proxy", log);
}

function npm() {
    exec("npm config rm proxy", log);
}

function curl(config) {
    exec("alias curl=''", { shell: config.gitBashShell }, log);
    exec("set HTTP_PROXY=", log);
    exec("set HTTPS_PROXY=", log);
}

/**
 * Veo si existe el settings.xml
 *  no existe: -
 *  existe: parseo y borro el <Proxy>
 */
function maven(config) {
    if (fs.existsSync(config.mavenSettingsXML)) {
        fs.readFile(config.mavenSettingsXML, 'utf-8', function (err, settingsStr) {
            if (err) return console.log("readFile: " + err);

            parseString(settingsStr, function (err, settingsJson) {
                if (err || !settingsJson) return console.log("parseString: " + err);

                utils.removeProxies(config, settingsJson);
            });
        });
    }
}