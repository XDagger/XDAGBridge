const ethUtils = require('ethereumjs-util');
const Web3 = require('web3');
const _ = require('underscore');

async function waitBlocks(client, numberOfBlocks) {
    var startBlock = await client.eth.getBlockNumber();
    var currentBlock = startBlock;
    while(numberOfBlocks > currentBlock - startBlock) {
        var newBlock = await client.eth.getBlockNumber();
        if(newBlock != currentBlock){
            currentBlock = newBlock;
        } else {
            await sleep(20000);
        }
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function waitForReceipt(txHash) {
    let timeElapsed = 0;
    let interval = 10000;
    return new Promise((resolve, reject) => {
        const checkInterval = setInterval(async () => {
            timeElapsed += interval;
            let receipt = await web3.eth.getTransactionReceipt(txHash);
            if(receipt != null) {
                clearInterval(checkInterval);
                resolve(receipt);
            }
            if(timeElapsed > 70000) {
                reject(`Operation took too long <a target="_blank" href="${config.explorer}/tx/${txHash}">check Tx on the explorer</a>`);
            }
        }, interval);
    });
}

function hexStringToBuffer(hexString) {
    return ethUtils.toBuffer(ethUtils.addHexPrefix(hexString));
}

function stripHexPrefix(str) {
    return (str.indexOf('0x') == 0) ? str.slice(2) : str;
  }

function privateToAddress(privateKey) {
    return ethUtils.bufferToHex(ethUtils.privateToAddress(this.hexStringToBuffer(privateKey)));
}

// Returns current memory allocated in MB
function memoryUsage() {
    let { heapUsed } = process.memoryUsage();
    return Math.round(heapUsed / (1024 * 1024));
}


function calculatePrefixesSuffixes(nodes) {
    const prefixes = [];
    const suffixes = [];
    const ns = [];

    for (let i = 0; i < nodes.length; i++) {
        nodes[i] = stripHexPrefix(nodes[i]);
    }

    for (let k = 0, l = nodes.length; k < l; k++) {
        if (k + 1 < l && nodes[k+1].indexOf(nodes[k]) >= 0)
            continue;

        ns.push(nodes[k]);
    }

    let hash = Web3.utils.sha3(Buffer.from(ns[0], 'hex'));
    hash = stripHexPrefix(hash);

    prefixes.push('0x');
    suffixes.push('0x');

    for (let k = 1, l = ns.length; k < l; k++) {
        const p = ns[k].indexOf(hash);

        prefixes.push(ethUtils.addHexPrefix(ns[k].substring(0, p)));
        suffixes.push(ethUtils.addHexPrefix(ns[k].substring(p + hash.length)));

        hash = Web3.utils.sha3(Buffer.from(ns[k], 'hex'));
        hash = stripHexPrefix(hash);
    }

    return { prefixes: prefixes, suffixes: suffixes };
}

const convert = (from, to) => str => Buffer.from(str, from).toString(to)
const utf8ToHex = convert('utf8', 'hex')
const hexToUtf8 = convert('hex', 'utf8')

const isEthAddress = (address) => address.length === 42;
const isTronHexAddress = (address) => address.length === 70 || address.length === 68;

var isHexStrict = function (hex) {
    return ((_.isString(hex) || _.isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex));
};

var hexToBytes = function (hex) {
    hex = hex.toString(16);

    if (!isHexStrict(hex)) {
        throw new Error('Given value "' + hex + '" is not a valid hex string.');
    }

    hex = hex.replace(/^0x/i, '');

    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
};

module.exports = {
    waitBlocks: waitBlocks,
    sleep: sleep,
    hexStringToBuffer: hexStringToBuffer,
    privateToAddress: privateToAddress,
    stripHexPrefix: stripHexPrefix,
    memoryUsage: memoryUsage,
    calculatePrefixesSuffixes: calculatePrefixesSuffixes,
    zeroHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    waitForReceipt: waitForReceipt,
    utf8ToHex,
    hexToUtf8,
    isEthAddress,
    isTronHexAddress,
    hexToBytes
}