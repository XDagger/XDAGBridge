/**
 * 
 * EthAccountatnt
 * Listing the cross events on Ethereum, and mint XDAG on XDAG network.
 * 
 */

const web3 = require('web3');
const fs = require('fs');
const request = require('request');

const abiBridge = require('../abis/Bridge.json');
const CustomError = require('./CustomError');
const utils = require('./utils');

module.exports = class Accountant {
    constructor(config, logger, Web3 = web3) {
        this.config = config;
        this.logger = logger;

        this.web3 = new Web3(config.host);
        this.bridgeContract = new this.web3.eth.Contract(abiBridge, this.config.bridgeAddress);
        this.lastBlockPath = `${config.storagePath || __dirname}/lastBlock.txt`;
    }

    async _fetchEvents() {
        const currentBlock = await this.web3.eth.getBlockNumber();
        let confirmations = 10; // 10 confirmations
        const toBlock = currentBlock - confirmations;
        this.logger.info('Running to Block', toBlock);

        if (toBlock <= 0) {
            return false;
        }

        if (!fs.existsSync(this.config.storagePath)) {
            fs.mkdirSync(this.config.storagePath);
        }
        let originalFromBlock = this.config.fromBlock || 0;
        let fromBlock = null;
        try {
            fromBlock = fs.readFileSync(this.lastBlockPath, 'utf8');
        } catch (err) {
            fromBlock = originalFromBlock;
        }
        if (fromBlock < originalFromBlock) {
            fromBlock = originalFromBlock;
        }
        if (fromBlock >= toBlock) {
            this.logger.warn(`Current chain Height ${toBlock} is the same or lesser than the last block processed ${fromBlock}`);
            return false;
        }
        fromBlock = parseInt(fromBlock) + 1;
        this.logger.debug('Running from Block', fromBlock);

        const recordsPerPage = 1000;
        const numberOfPages = Math.ceil((toBlock - fromBlock) / recordsPerPage);
        this.logger.debug(`Total pages ${numberOfPages}, blocks per page ${recordsPerPage}`);

        var fromPageBlock = fromBlock;
        for (var currentPage = 1; currentPage <= numberOfPages; currentPage++) {
            var toPagedBlock = fromPageBlock + recordsPerPage - 1;
            if (currentPage == numberOfPages) {
                toPagedBlock = toBlock
            }
            this.logger.debug(`Page ${currentPage} getting events from block ${fromPageBlock} to ${toPagedBlock}`);
            const logs = await this.bridgeContract.getPastEvents('allEvents', {
                fromBlock: fromPageBlock,
                toBlock: toPagedBlock
            });
            if (!logs) throw new Error('Failed to obtain the logs');

            this.logger.info(`Found ${logs.length} logs`);
            await this._processEvents(logs, toPagedBlock);
            fromPageBlock = toPagedBlock + 1;
        }
        return true;
    }

    async _parseEvent(evt) {
        this.logger.info('Processing event log:', evt);

        if (evt.event != 'CrossERC20XDAG') {
            this.logger.warn('Invalid event type!');
            return null;
        }

        const {
            _to: receiverAddress,
            _amount: amount,
            _from: senderAddress
        } = evt.returnValues;



        let result = {
            receiver: receiverAddress,
            amount: web3.utils.fromWei(amount),
            sender: senderAddress,

            blockHash: evt.blockHash,
            transactionHash: evt.transactionHash,
            logIndex: evt.logIndex,
        };

        return result;
    }

    async run() {
        let retries = 3;
        const sleepAfterRetrie = 3000;
        while (retries > 0) {
            try {
                let ret = await this._fetchEvents(); // Get events from main chain.
                return ret;
            } catch (err) {
                console.log(err)
                this.logger.error(new Error('Exception Running Federator'), err);
                retries--;
                this.logger.debug(`Run ${3 - retries} retrie`);
                if (retries > 0) {
                    await utils.sleep(sleepAfterRetrie);
                } else {
                    process.exit();
                }
            }
        }
    }

    async _processEvents(events, toBlock) { // Process main chain events
        try {
            for (let evt of events) {

                if (evt.event != 'CrossERC20XDAG') {
                    continue;
                }

                this.logger.info('Processing event:', evt);

                let result = await this._parseEvent(evt);
                this.logger.info('Got params: ', result);

                //todo: call API to send XDAG to XDAG wallet
                await this._xferXDAG(result.receiver, result.amount, "cross");
            }

            // save progress for next query
            this._saveProgress(this.lastBlockPath, ''+toBlock);

            return true;
        } catch (err) {
            throw new CustomError(`Exception processing events`, err);
        }
    }

    async _xferXDAG(toAddress, amount, remark) {

        // var data = { "method": "xdag_version", "params": [], "id": 1 };
        console.log(`xfer XDAG toAddress: ${toAddress}, amount: ${amount}, remark: ${remark}`);

        var data = {"method":"xdag_do_xfer", "params":[{"amount":""+amount, "address":toAddress, "remark":remark}], "id":1};

        var result = await new Promise(function (resolve, reject) {
            request.post('http://127.0.0.1:7667', { json: data }, (error, response, body) => {
                resolve({ error: error, response: response, body: body });
            });
        });

        // console.log(result);

        console.log(typeof result.body);
        
        if(result.body) {
            // var resp = JSON.parse(result.body);
            var resp = result.body;
            if(resp.result && resp.result.length > 0) {
                // { result: [ { block: 'wKmuzIZNNIIQXbfXsj40FjepPfox+R1q' } ], id: 1 }
                var block = resp.result[0].block;
                var url = `https://explorer.xdag.io/block/${block}`;
                console.log(`Xfer transaction: ${url}`);
            }
        }
    }

    _saveProgress(path, value) {
        if (value) {
            console.log(value);
            fs.writeFileSync(path, value);
        }
    }
}
