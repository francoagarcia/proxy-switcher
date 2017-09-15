const fs = require('fs');
const exec = require('child_process').exec;
const utils = require('./utils.js');

var log = (error, stdout, stderr) => console.log(stdout, stderr);

module.exports = {
    git,
    npm,
    curl,
    maven,
    pac
};

function git(proxy){
    exec("git config --global --unset http.proxy", log);
    exec("git config --global --unset https.proxy", log);
}

function npm(){
    exec("npm config rm proxy", log);
    exec("npm config rm https-proxy", log);
}

function curl(config){
    if(config.gitBash.active){
        opts.shell = config.gitBash.shell
        exec("alias curl=''", { shell : config.gitBash.shell }, log);
    } else {
        exec("set HTTP_PROXY=", log);
        exec("set HTTPS_PROXY=", log);
    }
}

function maven(){
    exec("ls -la", log);
}


function pac(){
    exec("ls -la", log);
}