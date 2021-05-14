window.MAINCHAIN_CONFIG = {
    networkId: 6777,
    name: 'ETH',
    bridge: "0x9c4578f223bb9e70c60b78e5d54a216c3d05c8f0",
    federation: "0x5a563ed77b4378b4dbcf16fcf7c904592fb8c1bc",
    allowTokens: "0x50fd285729110f85c67ad6b7918defd6d8317b1a",
    multiSig: "0x9324dd7fd2b971e7e19fd3da5bca471be3e7c63b",
    testToken: "0xb08b246e58eba496bd049de2ed39ef3f753103af",
    explorer: 'https://etherscan.io',
    explorerTokenTab: '#tokentxns',
    confirmations: 120,
    waitMinutes: 60,
    secondsPerBlock: 15,
    token: {
        symbol:'MAIN',
        address: '0xb08b246e58eba496bd049de2ed39ef3f753103af',
        decimals:18,
    }
};
window.SIDECHAIN_CONFIG = {
    networkId: 9099,
    name: 'Tron',
    bridge: "0xad1451180bcad1ceacfcb9b0ca8394fa67cb6816",
    federation: "0x3600941cfb203238b316a7188b2c23cef7732d1c",
    allowTokens: "0x40334ad2185be5b90d2845e4f464c8717750daf7",
    multiSig: "0xb2ddc9aa6ecfee23b4bb79e35b2dc5c9c17879a3",
    testToken: "0x97e9df0f87f30332a7116dd8ba4162a63b5c2ae2",
    explorer: 'https://explorer.rsk.co',
    explorerTokenTab: '?__tab=tokens%20transfers',
    confirmations: 120,
    waitMinutes: 60,
    secondsPerBlock: 3,
    crossToNetwork: MAINCHAIN_CONFIG,
    token: {
        symbol:'sunMAIN',
        // address: '413e165720872aea4838d667e287ea35fba36a611b',
        address: '0x97e9df0f87f30332a7116dd8ba4162a63b5c2ae2',
        decimals:18,
    },
};
window.MAINCHAIN_CONFIG.crossToNetwork = window.SIDECHAIN_CONFIG;

window.MAIN_TOKEN = {
    token: 'MAIN',
    name: 'TEST MAIN TOKEN',
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
    // eth mainchain: development
    [MAINCHAIN_CONFIG.networkId]: MAINCHAIN_CONFIG.token,
    // eth sidechain: testnet
    // 5777:{symbol:'sunMAIN', address:'0xee10DbC9F1C356e18e518B893975114FBd92D7fC', decimals:18},
    // tron mainchain: development
    // 9098: SIDECHAIN_CONFIG.token,
    // tron sidechain: testnet
    [SIDECHAIN_CONFIG.networkId]: SIDECHAIN_CONFIG.token,
};
