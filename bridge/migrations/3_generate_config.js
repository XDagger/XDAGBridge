const BridgeToken = artifacts.require("BridgeToken");
const BridgeTokenFactory = artifacts.require("BridgeTokenFactory");
const Bridge = artifacts.require("Bridge");

const fs = require('fs');

module.exports = function (deployer, networkName, accounts) {
    deployer.then(async () => {
        if (networkName !== 'mainnet') {
            console.log(`It's ${networkName}`);

            const bridge = await Bridge.deployed();
            const eXDAGAddress = await bridge.erc20XDAG.call();       

            let contracts = {
                eXDAG: eXDAGAddress,
                bridge: bridge.address
            };

            fs.writeFileSync(`../../front-end/src/config/${networkName}/contracts.json`, JSON.stringify(contracts, null, 4));

            const eXDAGBuild = require('../build/contracts/BridgeToken.json');
            fs.writeFileSync(`../../front-end/src/config/${networkName}/BridgeToken.abi.json`, JSON.stringify(eXDAGBuild.abi, null, 4));

            const bridgeBuild = require('../build/contracts/Bridge.json');
            fs.writeFileSync(`../../front-end/src/config/${networkName}/Bridge.abi.json`, JSON.stringify(bridgeBuild.abi, null, 4));
        } else {
            console.log("It's mainnet now!!");
        }
    })
};
