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

function npm(config) {
    utils.execCmd("npm config set proxy " + utils.getProxy('http', config.proxy));
}

function npm(config) {
    utils.execCmd("npm config rm proxy");
}

function isEnabled(){
    return false;
}