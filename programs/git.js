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
    utils.execCmd("git config --global http.proxy " + utils.getProxy('http', config.proxy));
    utils.execCmd("git config --global https.proxy " + utils.getProxy('https', config.proxy));
}

function off() {
    utils.execCmd("git config --global --unset http.proxy");
    utils.execCmd("git config --global --unset https.proxy");
}

function isEnabled(){
    return false;
}