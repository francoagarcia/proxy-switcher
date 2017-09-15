module.exports = {
    httpProxy,
    httpsProxy
};

function httpProxy(proxy){
    return `https://${proxy.user}:${proxy.pass}@${proxy.host}:${proxy.port}`;
}

function httpsProxy(proxy){
    return `https://${proxy.user}:${proxy.pass}@${proxy.host}:${proxy.port}`;
}