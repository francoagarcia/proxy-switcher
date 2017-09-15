function FindProxyForURL(url, host) {
    if (isInNet(myIpAddress(), "10.212.134.0", "255.255.255.0"))
        return "PROXY [${proxyHost}]:[${proxyPort}]";
    else
        return "DIRECT";
}