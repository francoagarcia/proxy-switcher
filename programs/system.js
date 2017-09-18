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
    setSystemProxy(config.proxy);
    turnSystemProxy(true);
}

function off(config) {
    turnSystemProxy(false);
}

function isEnabled(config){
    return false;
}

/***************************************
 ********** Private functions **********
 ***************************************/
function setSystemProxy(proxy) {
    exec(`reg add \"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\" ` +
        `/v ProxyServer /t REG_SZ /d ${proxy.host}:${proxy.port} /f`, logExec);
}

function turnSystemProxy(bool) {
    let enabled = new Number(bool);
    exec(`reg add \"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\" ` + 
        `/v ProxyEnable /t REG_DWORD /d ${enabled} /f`, logExec);
}
