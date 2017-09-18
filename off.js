const fs = require('fs');
const exec = require('child_process').exec;
const utils = require('./utils.js');
const xml2js = require('xml2js');
const parseString = require('xml2js').parseString;

let logExec = (error, stdout, stderr) => console.log(stdout, stderr);

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
    exec("git config --global --unset http.proxy", logExec);
    exec("git config --global --unset https.proxy", logExec);
}

function npm() {
    exec("npm config rm proxy", logExec);
}

function curl(config) {
    exec("alias curl=''", { shell: config.gitBashShell }, logExec);
    exec("set HTTP_PROXY=", logExec);
    exec("set HTTPS_PROXY=", logExec);
}

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