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
    utils.setSystemProxy(config.proxy);
    utils.turnSystemProxy(true);
}

function off(config) {
    utils.turnSystemProxy(false);
}

function isEnabled(){
    return false;
}