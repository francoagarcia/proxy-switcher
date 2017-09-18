const fs = require('fs');
const utils = require('./utils.js');
const parseString = require('xml2js').parseString;

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
    utils.execCmd("git config --global --unset http.proxy");
    utils.execCmd("git config --global --unset https.proxy");
}

function npm() {
    utils.execCmd("npm config rm proxy");
}

function curl(config) {
    utils.execInBash("alias curl=''", config);
    utils.execCmd("set HTTP_PROXY=");
    utils.execCmd("set HTTPS_PROXY=");
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