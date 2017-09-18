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

function system(config) {
    utils.setSystemProxy(config.proxy);
    utils.turnSystemProxy(true);
}

function git(config) {
    exec("git config --global http.proxy " + utils.getProxy('http', config.proxy), log);
    exec("git config --global https.proxy " + utils.getProxy('https', config.proxy), log);
}

function npm(config) {
    exec("npm config set proxy " + utils.getProxy('http', config.proxy), log);
}

function curl(config) {
    let curlrcPath = utils.getUserHome() + '\\.curlrc';
    if (!fs.existsSync(curlrcPath)) {
        console.log("No existe .curlrc -> Lo creo y agrego proxy");
        fs.writeFileSync(curlrcPath, utils.getCurlrc(config.proxy));
    }
    exec("alias curl='curl --config --proxy " + curlrcPath + "'", { shell: config.gitBashShell }, log);
    exec("set HTTP_PROXY=" + utils.getProxy('http', config.proxy), log);
    exec("set HTTPS_PROXY=" + utils.getProxy('https', config.proxy), log);
}

function maven(config) {
    if (!fs.existsSync(config.mavenSettingsXML)) {
        console.log("No existe settings.xml -> Lo creo y agrego proxy.");
        fs.writeFileSync(config.mavenSettingsXML, utils.getSettingsXML(config.proxy));
    } else {
        fs.readFile(config.mavenSettingsXML, 'utf-8', function (err, settingsStr) {
            if (err) return console.log("readFile: " + err);

            parseString(settingsStr, function (err, settingsJson) {
                if (err || !settingsJson) return console.log("parseString: " + err);

                if (!utils.existeProxyEnSettingsXML(settingsJson, 'http', config.proxy)) {
                    console.log("Agrego proxy HTTP a settings.xml");
                    utils.addProxyToSettingsXML(config, settingsJson, 'http', config.proxy);
                }

                if (!utils.existeProxyEnSettingsXML(settingsJson, 'https', config.proxy)) {
                    console.log("Agrego proxy HTTPS a settings.xml");
                    utils.addProxyToSettingsXML(config, settingsJson, 'https', config.proxy)
                }
            });
        });
    }
}