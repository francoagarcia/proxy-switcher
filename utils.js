const fs = require('fs');
const xml2js = require('xml2js');
const exec = require('child_process').exec;

module.exports = {
    getProxy,
    getProxyWithoutCredentials,
    getUserHome,
    execCmd,
    execInBash, //TODO rename exec in execInGitBash
};

let logExec = (error, stdout, stderr) => console.log(stdout, stderr);

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




