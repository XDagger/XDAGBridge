const Migrations = artifacts.require("Migrations");

module.exports = function (deployer, networkName, accounts) {
  deployer.then(async () => {
    if (networkName !== 'mainnet') {
      await deployer.deploy(Migrations);
    } else {
      console.log("Mainnet ...");
    }
  })
};
