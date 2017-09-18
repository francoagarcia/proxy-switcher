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
    let curlrcPath = utils.getUserHome() + '\\.curlrc';
    if (!fs.existsSync(curlrcPath)) {
        console.log("No existe .curlrc -> Lo creo y agrego proxy");
        fs.writeFileSync(curlrcPath, getCurlrc(config.proxy));
    }
    utils.execInBash("alias curl='curl --config --proxy " + curlrcPath + "'", config);
    utils.execCmd("set HTTP_PROXY=" + utils.getProxy('http', config.proxy));
    utils.execCmd("set HTTPS_PROXY=" + utils.getProxy('https', config.proxy));
}

function off(config) {
    utils.execInBash("alias curl=''", config);
    utils.execCmd("set HTTP_PROXY=");
    utils.execCmd("set HTTPS_PROXY=");
}

function isEnabled(config){
    return false;
}

/***************************************
 ********** Private functions **********
 ***************************************/
function getCurlrc(proxy) {
    return "proxy=" + getProxy('http', proxy) + "\n" +
        "https_proxy=" + getProxy('https', proxy) + "\n";
}