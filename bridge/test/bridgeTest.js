const truffleAssert = require('truffle-assertions');

const Bridge = artifacts.require('Bridge');
const BridgeToken = artifacts.require('BridgeToken');
const BridgeTokenFactory = artifacts.require("BridgeTokenFactory");

const SUPPLY = '1000000000';
const AMOUNT = '1000';

contract('Bridge', accounts => {
  let token;
  let bridge;
  let factory;

  before(async () => {
    factory = await BridgeTokenFactory.new();
  })

  it('should have e as prefix by default', async () => {
    bridge = await Bridge.new();
    bridge.init(factory.address, 'e');
    let prefix = await bridge.getPrefix();
    assert.equal(prefix, 'e');
  });

  it('should create eXDAG by default', async () => {
    bridge = await Bridge.new();
    bridge.init(factory.address, 'e');

    let tokenAddress = await bridge.erc20XDAG.call();
    token = await BridgeToken.at(tokenAddress);

    let symbol = await token.symbol();
    assert.equal(symbol, 'eXDAG');
  });
});
