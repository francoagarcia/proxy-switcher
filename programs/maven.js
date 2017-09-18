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
        fs.writeFileSync(config.mavenSettingsXML, getSettingsXML(config.proxy));
    } else {
        fs.readFile(config.mavenSettingsXML, 'utf-8', function (err, settingsStr) {
            if (err) return console.log("readFile: " + err);

            parseString(settingsStr, function (err, settingsJson) {
                if (err || !settingsJson) return console.log("parseString: " + err);

                if (!existeProxyEnSettingsXML(settingsJson, 'http', config.proxy)) {
                    addProxyToSettingsXML(config, settingsJson, 'http', config.proxy);
                }

                if (!existeProxyEnSettingsXML(settingsJson, 'https', config.proxy)) {
                    addProxyToSettingsXML(config, settingsJson, 'https', config.proxy)
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

                removeProxies(config, settingsJson);
            });
        });
    }
}

function isEnabled(config){
    return existeProxyEnSettingsXML(settingsJson, 'http', config.proxy);
}

/***************************************
 ********** Private functions **********
 ***************************************/

function getSettingsXML(proxy) {
    return  '<settings>\n' +
                getProxiesSettingsXML(proxy) + '\n' +
            '</settings>';
}

function getProxiesSettingsXML(proxy) {
    return  '\t<proxies>\n' +
                getProxySettingsXML('http', proxy) + '\n' +
                getProxySettingsXML('https', proxy) + '\n' +
            '\t</proxies>';
}

function getProxySettingsXML(protocol, proxy) {
    return  `\t\t<proxy>\n` +
                `\t\t\t<id>${protocol}Proxy</id>\n` +
                `\t\t\t<active>true</active>\n` +
                `\t\t\t<protocol>${protocol}</protocol>\n` +
                `\t\t\t<host>${proxy.host}</host>\n` +
                `\t\t\t<port>${proxy.port}</port>\n` +
                `\t\t\t<username>${proxy.user}</username>\n` +
                `\t\t\t<password>${proxy.pass}</password>\n` +
            `\t\t</proxy>`;
}

function existeProxyEnSettingsXML(settingsJson, protocol, proxy) {
    if (isProxiesArrayEmpty(settingsJson))
        return false;

    return settingsJson.settings.proxies[0].proxy
                    .filter(p => p.protocol[0] === protocol &&
                                 p.host[0] === proxy.host &&
                                 p.port[0] == proxy.port)
                    .length > 0;
}

function addProxyToSettingsXML(config, settingsJson, protocol, proxy) {
    let proxyXML = {
        id: [protocol + 'Proxy'],
        active: [true],
        protocol: [protocol],
        host: [proxy.host],
        port: [proxy.port],
        username: [proxy.user],
        password: [proxy.pass]
    };

    if (isProxiesArrayEmpty(settingsJson)) {
        initializeProxies(settingsJson);
    }

    settingsJson.settings.proxies[0].proxy.push(proxyXML);
    saveSettingsXML(config, settingsJson);
}

function removeProxies(config, settingsJson){
    initializeProxies(settingsJson);
    saveSettingsXML(config, settingsJson);
}

function isProxiesArrayEmpty(settingsJson) {
    return settingsJson.settings.proxies[0].proxy === undefined || settingsJson.settings.proxies[0].proxy.length === 0;
}

function initializeProxies(settingsJson){
    settingsJson.settings.proxies = [{ proxy: [] }];
}

function printSettingsJson(settingsJson) {
    console.log("-----------------------------");
    console.log(settingsJson);
    console.log(settingsJson.settings);
    console.log(settingsJson.settings.proxies[0]);
    console.log(settingsJson.settings.proxies[0].proxy);
    console.log(settingsJson.settings.proxies[0].proxy[0]);
    console.log(settingsJson.settings.proxies[0].proxy[0].id[0]);
    console.log("-----------------------------");
}

function saveSettingsXML(config, settingsJson) {
    var settingsXml = new xml2js.Builder().buildObject(settingsJson);
    fs.writeFile(config.mavenSettingsXML, settingsXml, function (err, data) {
        if (err) console.log(err);
    });
}