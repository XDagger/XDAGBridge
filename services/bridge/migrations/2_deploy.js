const BridgeTokenFactory = artifacts.require("BridgeTokenFactory");
const BridgeToken = artifacts.require("BridgeToken");
const Bridge = artifacts.require("DAGBridge");

const BN = web3.utils.BN;
const UNIT = new BN('1000000000000000000');

module.exports = function (deployer, networkName, accounts) {

    deployer.then(async () => {
        if (networkName !== 'mainnet') {

            let factory = await deployer.deploy(BridgeTokenFactory);

            let result = await factory.createBridgeToken("eXDAG", "eXDAG", 18);
            console.log(result);

            let bridge = await deployer.deploy(Bridge);
            await bridge.init(factory.address, "e");

            console.log(bridge.erc20XDAG);


            // await deployer.deploy(BridgeToken, "eXDAG", "eXDAG", accounts[0], 18);
        } else {
            console.log("Mainnet ...");
        }
    })

};
