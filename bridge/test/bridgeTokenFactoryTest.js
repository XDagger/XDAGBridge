const truffleAssert = require('truffle-assertions');

const BridgeToken = artifacts.require('BridgeToken');
const BridgeTokenFactory = artifacts.require('BridgeTokenFactory');

const utils = require('./utils');

const BN = web3.utils.BN;

const UNIT = new BN('1000000000000000000');
const SUPPLY = UNIT.mul(new BN('1000000000'));

contract('Bridge Token Factory', accounts => {
  let tokenFactory;

  before(async () => {
    tokenFactory = await BridgeTokenFactory.deployed();
  })

  it('should create a BridgeToken', async () => {
    const receipt = await tokenFactory.createBridgeToken("eXDAG", "eXDAG", 18);

    utils.checkRcpt(receipt);
    assert.equal(receipt.logs[0].event, 'BridgeTokenCreated');
  });

});
