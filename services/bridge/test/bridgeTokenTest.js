const truffleAssert = require('truffle-assertions');

const BridgeToken = artifacts.require('BridgeToken');

const SUPPLY = '1000000000';
const AMOUNT = '1000';

contract('Bridge Token', accounts => {
  let token;

  before(async () => {
  })

  it('should put 1B Bridge Token in the first account', async () => {
    token = await BridgeToken.new("eXDAG", "eXDAG", accounts[0], 18);
    await token.mint(accounts[0], web3.utils.toWei(SUPPLY));
    const balance = await token.balanceOf(accounts[0]);
    assert.equal(web3.utils.fromWei(balance), SUPPLY);
  });

  it('should send 1000 Bridge Token to accounts[1]', async () => {
    token = await BridgeToken.new("eXDAG", "eXDAG", accounts[0], 18);
    await token.mint(accounts[0], web3.utils.toWei(SUPPLY));
    await token.transfer(accounts[1], web3.utils.toWei(AMOUNT));
    const balance = await token.balanceOf(accounts[0]);
    const xxx = web3.utils.toWei(SUPPLY) - (web3.utils.toWei(AMOUNT));
    assert.equal(balance, xxx);
  });

  it('should send 1000 Bridge Token to accounts[1]', async () => {
    token = await BridgeToken.new("eXDAG", "eXDAG", accounts[0], 18);
    await token.mint(accounts[0], web3.utils.toWei(SUPPLY));
    await token.transfer(accounts[1], web3.utils.toWei(AMOUNT));
    const balance = await token.balanceOf(accounts[1]);
    assert.equal(web3.utils.fromWei(balance), AMOUNT);
  });

  it('should let accounts[2] to transfer 1000 Bridge Token', async () => {
    token = await BridgeToken.new("eXDAG", "eXDAG", accounts[0], 18);
    await token.mint(accounts[0], web3.utils.toWei(SUPPLY));
    await token.approve(accounts[2], web3.utils.toWei(AMOUNT));
    await token.transferFrom(accounts[0], accounts[1], web3.utils.toWei(AMOUNT), {from: accounts[2]});
    const balance = await token.balanceOf(accounts[1]);
    assert.equal(web3.utils.fromWei(balance), AMOUNT);
  });
});
