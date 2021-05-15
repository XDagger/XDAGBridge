const BridgeTokenFactory = artifacts.require("BridgeTokenFactory");
const BridgeToken = artifacts.require("BridgeToken");
const Bridge = artifacts.require("Bridge");

const BN = web3.utils.BN;
const UNIT = new BN('1000000000000000000');

module.exports = function (deployer, networkName, accounts) {

    deployer.then(async () => {
        if (networkName !== 'mainnet') {

            let mainAccount = accounts[0];

            let factory = await deployer.deploy(BridgeTokenFactory);

            // let result = await factory.createBridgeToken("eXDAG", "eXDAG", 18);
            // console.log(result);

            let bridge = await deployer.deploy(Bridge);
            await bridge.init(factory.address, "e");
            let erc20XDAGAddress = await bridge.erc20XDAG.call();
            console.log(`bridge erc20XDAG: ${erc20XDAGAddress}`);

            let bridgeToken = await BridgeToken.at(erc20XDAGAddress);

            {
                let num = await bridgeToken.balanceOf(mainAccount);
                let balance = web3.utils.fromWei(num);
                console.log("Before acceptTransfer", `${mainAccount}'s balance is ${balance}`);
            }

            await bridge.acceptTransfer(mainAccount, web3.utils.toWei("1000"), "0x5ef6ecf2ba4b365ffed170f2ca8fb42b06e3f8cedccf36c9efc1dc835afb6dfa", "0x5ef6ecf2ba4b365ffed170f2ca8fb42b06e3f8cedccf36c9efc1dc835afb6dfa", 0);

            {
                let num = await bridgeToken.balanceOf(mainAccount);
                let balance = web3.utils.fromWei(num);
                console.log("After acceptTransfer", `${mainAccount}'s balance is ${balance}`);
            }

            await bridgeToken.approve(bridge.address, web3.utils.toWei("1000"));

            await bridge.receiveTokens(web3.utils.toWei("1000"), "helloworld");

            {
                let num = await bridgeToken.balanceOf(mainAccount);
                let balance = web3.utils.fromWei(num);
                console.log("After receiveToken", `${mainAccount}'s balance is ${balance}`);
            }

            // await deployer.deploy(BridgeToken, "eXDAG", "eXDAG", accounts[0], 18);
        } else {
            console.log("Mainnet ...");
        }
    })

};
