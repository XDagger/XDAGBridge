export  default  function getConfig(networkId) {
    if (networkId === window.SIDECHAIN_CONFIG.networkId) return window.SIDECHAIN_CONFIG;
    return window.MAINCHAIN_CONFIG;
}
