const fs = require('fs');
const xml2js = require('xml2js');
const exec = require('child_process').exec;

module.exports = {
    getProxy,
    getProxyWithoutCredentials,
    getCurlrc,
    getUserHome,
    execCmd,
    execInBash,
    getProxySettingsXML,
    getProxiesSettingsXML,
    getSettingsXML,
    existeProxyEnSettingsXML,
    addProxyToSettingsXML,
    removeProxies,
    setSystemProxy,
    turnSystemProxy
};

let logExec = (error, stdout, stderr) => console.log(stdout, stderr);

function getCurlrc(proxy) {
    return "proxy=" + getProxy('http', proxy) + "\n" +
        "https_proxy=" + getProxy('https', proxy) + "\n";
}

function getProxy(protocol, proxy) {
    return `${protocol}://${proxy.user}:${proxy.pass}@${proxy.host}:${proxy.port}`;
}

function getProxyWithoutCredentials(protocol, proxy) {
    return `${protocol}://${proxy.host}:${proxy.port}`;
}

function getUserHome() {
    return process.env.HOME || process.env.USERPROFILE;
}

function execCmd(command){
    exec(command, logExec);
}

function execInBash(command, config){
    if(config.gitBashShell)
        exec(command, { shell : config.gitBashShell }, logExec);
}

function setSystemProxy(proxy) {
    exec(`reg add \"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\" ` +
        `/v ProxyServer /t REG_SZ /d ${proxy.host}:${proxy.port} /f`, logExec);
}

function turnSystemProxy(bool) {
    let enabled = new Number(bool);
    exec(`reg add \"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\" ` + 
        `/v ProxyEnable /t REG_DWORD /d ${enabled} /f`, logExec);
}

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

/***************************************
 ********** Private functions **********
 ***************************************/
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