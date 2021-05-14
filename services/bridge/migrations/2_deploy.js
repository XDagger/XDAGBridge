const BridgeTokenFactory = artifacts.require("BridgeTokenFactory");
const BridgeToken = artifacts.require("BridgeToken");

const BN = web3.utils.BN;
const UNIT = new BN('1000000000000000000');

module.exports = function (deployer, networkName, accounts) {

    deployer.then(async () => {
        if (networkName !== 'mainnet') {




            await deployer.deploy(BridgeToken, "eXDAG", "eXDAG", accounts[0], 18);
        } else {
            console.log("Mainnet ...");
        }
    })

};
