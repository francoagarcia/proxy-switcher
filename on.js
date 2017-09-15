const fs = require('fs');
const exec = require('child_process').exec;
const utils = require('./utils.js');

var log = (error, stdout, stderr) => console.log(stdout, stderr);

module.exports = {
    git,
    npm,
    maven,
    curl,
    pac,
    test
};

function test(config){
    if(config.gitBash.active){
        opts.shell = config.gitBash.shell
        exec("alias curl='curl --config --proxy ~/.curlrc'", { shell : config.gitBash.shell }, log);
    } else {
        exec("set HTTP_PROXY=" + utils.httpProxy(config.proxy), log);
        exec("set HTTPS_PROXY=" + utils.httpProxy(config.proxy), log);
    }
}

function git(proxy){
    exec("git config --global http.proxy " + utils.httpProxy(proxy), log);
    exec("git config --global https.proxy " + utils.httpsProxy(proxy), log);
}

function npm(proxy){
    exec("npm config set proxy " + utils.httpProxy(proxy), log);
    exec("npm config set https-proxy " + utils.httpsProxy(proxy), log);
}

function maven(){
    exec("ls -la", log);
}

function curl(){
    exec("ls -la", log);
}

function pac(proxy){
    exec("ls -la", log);
}


/**
 * Curl
 * 
 * ~/.curlrc
 * alias curl="curl --config --proxy ~/.curlrc"
 */