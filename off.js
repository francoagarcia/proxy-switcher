const fs = require('fs');
const exec = require('child_process').exec;

var log = (error, stdout, stderr) => console.log(stdout, stderr);

module.exports = {
    git,
    npm,
    maven,
    curl,
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

function maven(){
    exec("ls -la", log);
}

function curl(){
    exec("ls -la", log);
}

function pac(){
    exec("ls -la", log);
}

/**
 * Curl
 * 
 * ~/.curlrc
 * alias curl="curl --config --proxy ~/.curlrc"
 */