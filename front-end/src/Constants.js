
import bridgeABIKovan from "./config/kovan/Bridge.abi.json";
import bridgeABIMainnet from "./config/mainnet/Bridge.abi.json";

import eXDAGABIKovan from "./config/kovan/BridgeToken.abi.json";
import eXDAGABIMainnet from "./config/mainnet/BridgeToken.abi.json";

import contractAddressesKovan from "./config/kovan/contracts.json";
import contractAddressesMainnet from "./config/mainnet/contracts.json";

const network = 'kovan';
const constants = {
  mainnet: {
    etherscanBase: 'https://etherscan.io',
    bridgeAddress: contractAddressesMainnet.bridge,
    bridgeABI: bridgeABIMainnet,
    eXDAGAddress: contractAddressesMainnet.eXDAG,
    eXDAGABI: eXDAGABIMainnet,
  },
  kovan: {
    etherscanBase: 'https://kovan.etherscan.io',
    bridgeAddress: contractAddressesKovan.bridge,
    bridgeABI: bridgeABIKovan,
    eXDAGAddress: contractAddressesKovan.eXDAG,
    eXDAGABI: eXDAGABIKovan,
  }
};

const etherscanBase = constants[network].etherscanBase;
const bridgeAddress = constants[network].bridgeAddress;
const bridgeABI = constants[network].bridgeABI;
const eXDAGAddress = constants[network].eXDAGAddress;
const eXDAGABI = constants[network].eXDAGABI;

console.log('bridgeAddresses: ', bridgeAddress);
console.log('eXDAGAddress', eXDAGAddress);


function loadBridgeContract(web3) {
  console.log('loadBridgeContract: Loading bridge contract', bridgeAddress);
  return new web3.eth.Contract(bridgeABI, bridgeAddress);
}

function loadeXDAGContract(web3) {
    console.log('loadeXDAGContract: Loading eXDAG contract', eXDAGAddress);
    return new web3.eth.Contract(eXDAGABI, eXDAGAddress);
}


export {
  network,
  etherscanBase,
  bridgeAddress,
  eXDAGAddress,
  loadBridgeContract,
  loadeXDAGContract
};
