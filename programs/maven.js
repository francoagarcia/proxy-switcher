const fs = require('fs');
const exec = require('child_process').exec;
const xml2js = require('xml2js');
const parseString = require('xml2js').parseString;
const utils = require('./utils.js');

module.exports = {
    on,
    off,
    isEnabled
};

function on(config) {
    if (!fs.existsSync(config.mavenSettingsXML)) {
        console.log("No existe settings.xml -> Lo creo y agrego proxy.");
        fs.writeFileSync(config.mavenSettingsXML, utils.getSettingsXML(config.proxy));
    } else {
        fs.readFile(config.mavenSettingsXML, 'utf-8', function (err, settingsStr) {
            if (err) return console.log("readFile: " + err);

            parseString(settingsStr, function (err, settingsJson) {
                if (err || !settingsJson) return console.log("parseString: " + err);

                if (!utils.existeProxyEnSettingsXML(settingsJson, 'http', config.proxy)) {
                    utils.addProxyToSettingsXML(config, settingsJson, 'http', config.proxy);
                }

                if (!utils.existeProxyEnSettingsXML(settingsJson, 'https', config.proxy)) {
                    utils.addProxyToSettingsXML(config, settingsJson, 'https', config.proxy)
                }
            });
        });
    }
}

function off(config) {
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

function isEnabled(){
    return false;
}